import { useEffect, useRef } from "react";

import { cn } from "@/lib/utils/cn";

interface PyramidProps {
	className?: string;
	color?: string;
	faceOpacity?: number;
	edgeThickness?: number;
	borderRadius?: number;
}

const TETRA_VERTICES: [number, number, number][] = [
	[1, 0, -1 / Math.SQRT2],
	[-1, 0, -1 / Math.SQRT2],
	[0, 1, 1 / Math.SQRT2],
	[0, -1, 1 / Math.SQRT2]
];

const TETRA_FACES = [[0, 1, 2], [0, 1, 3], [0, 2, 3], [1, 2, 3]];
const TETRA_EDGES = [[0, 1], [0, 2], [0, 3], [1, 2], [1, 3], [2, 3]];
const FOV = 400;

const OptimizedRelaxedPyramid = ({
	className,
	color = "#ffdd00",
	faceOpacity = 0.5,
	edgeThickness = 4,
	borderRadius = 12
}: PyramidProps) => {
	const containerRef = useRef<HTMLDivElement>(null);
	const svgRef = useRef<SVGSVGElement>(null);

	const isHovered = useRef(false);
	const angles = useRef({ x: 0, y: 0, z: 0 });
	const burst = useRef(0);
	const dims = useRef({ w: 0, h: 0 });
	const mouse = useRef({ isDown: false, lastX: 0, lastY: 0 });

	useEffect(() => {
		const svg = svgRef.current;
		if (!svg)
			return;

		// 1. Create persistent face elements
		const faceEls = TETRA_FACES.map(() => {
			const el = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
			el.setAttribute("fill", color);
			el.setAttribute("fill-opacity", faceOpacity.toString());
			el.setAttribute("stroke", color);
			el.setAttribute("stroke-width", borderRadius.toString());
			el.setAttribute("stroke-linejoin", "round");
			svg.appendChild(el);
			return el;
		});

		// 2. Create persistent edge (skeleton) elements
		const edgeEls = TETRA_EDGES.map(() => {
			const el = document.createElementNS("http://www.w3.org/2000/svg", "line");
			el.setAttribute("stroke", color);
			el.setAttribute("stroke-width", edgeThickness.toString());
			el.setAttribute("stroke-linecap", "round");
			svg.appendChild(el);
			return el;
		});

		const resizeObserver = new ResizeObserver((entries) => {
			for (const entry of entries) {
				dims.current = { w: entry.contentRect.width, h: entry.contentRect.height };
			}
		});
		if (containerRef.current)
			resizeObserver.observe(containerRef.current);

		const rotate = (v: [number, number, number], ax: number, ay: number, az: number): [number, number, number] => {
			let [x, y, z] = v;
			const cX = Math.cos(ax);
			const sX = Math.sin(ax);
			const cY = Math.cos(ay);
			const sY = Math.sin(ay);
			const cZ = Math.cos(az);
			const sZ = Math.sin(az);
			let ty = y * cX - z * sX;
			let tz = y * sX + z * cX;
			y = ty;
			z = tz;
			let tx = x * cY + z * sY;
			tz = -x * sY + z * cY;
			x = tx;
			z = tz;
			tx = x * cZ - y * sZ;
			ty = x * sZ + y * cZ;
			x = tx;
			y = ty;

			return [x, y, z];
		};

		let requestID: number;
		const animate = () => {
			const { w, h } = dims.current;
			if (w === 0 || h === 0) {
				requestID = requestAnimationFrame(animate);
				return;
			}

			const cx = w / 2;
			const cy = h / 2;
			const baseScale = Math.min(w, h) * 0.32;

			if (!mouse.current.isDown) {
				angles.current.x += 0.002;
				angles.current.y += 0.003;
			}

			// Smooth movement for faces
			const targetBurst = isHovered.current ? 0.6 : 0;
			burst.current += (targetBurst - burst.current) * 0.08;

			const rotV = TETRA_VERTICES.map(v => rotate(v, angles.current.x, angles.current.y, angles.current.z));

			interface Sortable { z: number; el: SVGElement }
			const drawOrder: Sortable[] = [];

			// 3. Update Faces
			TETRA_FACES.forEach((indices, i) => {
				const faceV = indices.map(idx => rotV[idx]);
				const cX = (faceV[0][0] + faceV[1][0] + faceV[2][0]) / 3;
				const cY = (faceV[0][1] + faceV[1][1] + faceV[2][1]) / 3;
				const cZ = (faceV[0][2] + faceV[1][2] + faceV[2][2]) / 3;

				const pointsStr = faceV.map((v) => {
					const ox = v[0] + (cX * burst.current);
					const oy = v[1] + (cY * burst.current);
					const oz = v[2] + (cZ * burst.current);
					return `${cx + ox * (FOV / (FOV + oz)) * baseScale},${cy + oy * (FOV / (FOV + oz)) * baseScale}`;
				}).join(" ");

				const el = faceEls[i];
				el.setAttribute("points", pointsStr);
				drawOrder.push({ z: cZ, el });
			});

			// 4. Update Skeleton Edges
			// CRITICAL FIX: Binary toggle. If burst is > 0.01, hide edges instantly.
			const showEdges = burst.current < 0.01;

			TETRA_EDGES.forEach((indices, i) => {
				const a = rotV[indices[0]];
				const b = rotV[indices[1]];
				const el = edgeEls[i];

				if (showEdges) {
					el.setAttribute("visibility", "visible");
					el.setAttribute("x1", (cx + a[0] * (FOV / (FOV + a[2])) * baseScale).toString());
					el.setAttribute("y1", (cy + a[1] * (FOV / (FOV + a[2])) * baseScale).toString());
					el.setAttribute("x2", (cx + b[0] * (FOV / (FOV + b[2])) * baseScale).toString());
					el.setAttribute("y2", (cy + b[1] * (FOV / (FOV + b[2])) * baseScale).toString());
					drawOrder.push({ z: (a[2] + b[2]) / 2, el });
				}
				else {
					el.setAttribute("visibility", "hidden");
				}
			});

			// 5. Z-Sort
			drawOrder.sort((a, b) => b.z - a.z);
			drawOrder.forEach(item => svg.appendChild(item.el));

			requestID = requestAnimationFrame(animate);
		};

		requestID = requestAnimationFrame(animate);
		return () => {
			cancelAnimationFrame(requestID);
			resizeObserver.disconnect();
			if (svg)
				svg.innerHTML = "";
		};
	}, [color, faceOpacity, edgeThickness, borderRadius]);

	return (
		<div
			ref={containerRef}
			className={cn("relative w-full h-full min-h-[400px] overflow-hidden bg-transparent", className)}
			onMouseEnter={() => { isHovered.current = true; }}
			onMouseLeave={() => {
				isHovered.current = false;
				mouse.current.isDown = false;
			}}
		>
			<svg
				ref={svgRef}
				className="w-full h-full cursor-move overflow-visible"
				onMouseDown={(e) => {
					mouse.current = { isDown: true, lastX: e.clientX, lastY: e.clientY };
				}}
				onMouseMove={(e) => {
					if (!mouse.current.isDown)
						return;
					angles.current.y += (e.clientX - mouse.current.lastX) * 0.01;
					angles.current.x += (e.clientY - mouse.current.lastY) * 0.01;
					mouse.current.lastX = e.clientX;
					mouse.current.lastY = e.clientY;
				}}
				onMouseUp={() => { mouse.current.isDown = false; }}
			/>
		</div>
	);
};

export default OptimizedRelaxedPyramid;
