// import { useEffect, useRef } from "react";

// import { cn } from "@/lib/utils/cn";

// interface PyramidProps {
// 	className?: string;
// 	color?: string;
// 	faceOpacity?: number;
// 	edgeThickness?: number;
// 	borderRadius?: number;
// }

// /**
//  * PERFECTLY CENTERED TETRAHEDRON
//  * Average of all X, Y, Z coordinates is 0, ensuring smooth rotation.
//  */
// const PYRAMID_VERTICES: [number, number, number][] = [
// 	[0, -0.75, 0], // 0: Apex (Top)
// 	[0, 0.25, 0.866], // 1: Base Front
// 	[0.75, 0.25, -0.433], // 2: Base Back-Right
// 	[-0.75, 0.25, -0.433] // 3: Base Back-Left
// ];

// const PYRAMID_TRIANGLE_FACES = [
// 	[0, 1, 2], // Front-Right face
// 	[0, 2, 3], // Back face
// 	[0, 3, 1] // Front-Left face
// ];

// const PYRAMID_BASE_FACE = [1, 3, 2]; // Bottom face

// const PYRAMID_EDGES = [
// 	[0, 1],
// 	[0, 2],
// 	[0, 3], // Vertical edges
// 	[1, 2],
// 	[2, 3],
// 	[3, 1] // Base edges
// ];

// const FOV = 400;

// const rotateVertex = (
// 	v: [number, number, number],
// 	cX: number,
// 	sX: number,
// 	cY: number,
// 	sY: number,
// 	cZ: number,
// 	sZ: number
// ): [number, number, number] => {
// 	let [x, y, z] = v;
// 	// X-axis rotation
// 	let ty = y * cX - z * sX;
// 	let tz = y * sX + z * cX;
// 	y = ty; z = tz;
// 	// Y-axis rotation
// 	let tx = x * cY + z * sY;
// 	tz = -x * sY + z * cY;
// 	x = tx; z = tz;
// 	// Z-axis rotation
// 	tx = x * cZ - y * sZ;
// 	ty = x * sZ + y * cZ;
// 	return [tx, ty, z];
// };

// const OptimizedRelaxedPyramid = ({
// 	className,
// 	color = "#ffdd00",
// 	faceOpacity = 0.5,
// 	edgeThickness = 0,
// 	borderRadius = 10
// }: PyramidProps) => {
// 	const containerRef = useRef<HTMLDivElement>(null);
// 	const svgRef = useRef<SVGSVGElement>(null);
// 	const isHovered = useRef(false);
// 	const angles = useRef({ x: 0, y: 0, z: 0 });
// 	const burst = useRef(0);
// 	const dims = useRef({ w: 0, h: 0 });
// 	const mouse = useRef({ isDown: false, lastX: 0, lastY: 0 });

// 	useEffect(() => {
// 		const svg = svgRef.current;
// 		if (!svg)
// 			return;

// 		// 1. Create side face elements
// 		const triangleFaceEls = PYRAMID_TRIANGLE_FACES.map(() => {
// 			const el = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
// 			el.setAttribute("fill", color);
// 			el.setAttribute("fill-opacity", faceOpacity.toString());
// 			el.setAttribute("stroke", color);
// 			el.setAttribute("stroke-width", borderRadius.toString());
// 			el.setAttribute("stroke-linejoin", "round");
// 			svg.appendChild(el);
// 			return el;
// 		});

// 		// 2. Create base face element
// 		const baseFaceEl = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
// 		baseFaceEl.setAttribute("fill", color);
// 		baseFaceEl.setAttribute("fill-opacity", faceOpacity.toString());
// 		baseFaceEl.setAttribute("stroke", color);
// 		baseFaceEl.setAttribute("stroke-width", borderRadius.toString());
// 		baseFaceEl.setAttribute("stroke-linejoin", "round");
// 		svg.appendChild(baseFaceEl);

// 		// 3. Create edges
// 		const edgeEls = PYRAMID_EDGES.map(() => {
// 			const el = document.createElementNS("http://www.w3.org/2000/svg", "line");
// 			el.setAttribute("stroke", color);
// 			el.setAttribute("stroke-width", edgeThickness.toString());
// 			el.setAttribute("stroke-linecap", "round");
// 			svg.appendChild(el);
// 			return el;
// 		});

// 		const resizeObserver = new ResizeObserver((entries) => {
// 			for (const entry of entries) {
// 				dims.current = { w: entry.contentRect.width, h: entry.contentRect.height };
// 			}
// 		});
// 		if (containerRef.current)
// 			resizeObserver.observe(containerRef.current);

// 		let requestID: number;
// 		const rotV: [number, number, number][] = [[0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0]];

// 		const animate = () => {
// 			const { w, h } = dims.current;
// 			if (w === 0 || h === 0) {
// 				requestID = requestAnimationFrame(animate);
// 				return;
// 			}

// 			const cx = w / 2;
// 			const cy = h / 2;
// 			const baseScale = Math.min(w, h) * 0.35; // Slightly larger scale

// 			if (!mouse.current.isDown) {
// 				angles.current.x += 0.002;
// 				angles.current.y += 0.003;
// 			}

// 			const targetBurst = isHovered.current ? 0.6 : 0;
// 			burst.current += (targetBurst - burst.current) * 0.08;

// 			const cosX = Math.cos(angles.current.x);
// 			const sinX = Math.sin(angles.current.x);
// 			const cosY = Math.cos(angles.current.y);
// 			const sinY = Math.sin(angles.current.y);
// 			const cosZ = Math.cos(angles.current.z);
// 			const sinZ = Math.sin(angles.current.z);

// 			for (let i = 0; i < 4; i++) {
// 				rotV[i] = rotateVertex(PYRAMID_VERTICES[i], cosX, sinX, cosY, sinY, cosZ, sinZ);
// 			}

// 			const drawOrder: { z: number; el: SVGElement }[] = [];
// 			const currentBurst = burst.current;

// 			// Side Faces
// 			for (let i = 0; i < PYRAMID_TRIANGLE_FACES.length; i++) {
// 				const indices = PYRAMID_TRIANGLE_FACES[i];
// 				const v0 = rotV[indices[0]]; const v1 = rotV[indices[1]]; const v2 = rotV[indices[2]];
// 				const bCX = (v0[0] + v1[0] + v2[0]) * 0.3333;
// 				const bCY = (v0[1] + v1[1] + v2[1]) * 0.3333;
// 				const bCZ = (v0[2] + v1[2] + v2[2]) * 0.3333;

// 				let pointsStr = "";
// 				for (let j = 0; j < 3; j++) {
// 					const v = rotV[indices[j]];
// 					const ox = v[0] + (bCX * currentBurst);
// 					const oy = v[1] + (bCY * currentBurst);
// 					const oz = v[2] + (bCZ * currentBurst);
// 					const perspective = FOV / (FOV + oz);
// 					pointsStr += `${cx + ox * perspective * baseScale},${cy + oy * perspective * baseScale} `;
// 				}
// 				triangleFaceEls[i].setAttribute("points", pointsStr);
// 				drawOrder.push({ z: bCZ, el: triangleFaceEls[i] });
// 			}

// 			// Base Face
// 			{
// 				const indices = PYRAMID_BASE_FACE;
// 				const v0 = rotV[indices[0]]; const v1 = rotV[indices[1]]; const v2 = rotV[indices[2]];
// 				const bCX = (v0[0] + v1[0] + v2[0]) * 0.3333;
// 				const bCY = (v0[1] + v1[1] + v2[1]) * 0.3333;
// 				const bCZ = (v0[2] + v1[2] + v2[2]) * 0.3333;

// 				let pointsStr = "";
// 				for (let j = 0; j < 3; j++) {
// 					const v = rotV[indices[j]];
// 					const ox = v[0] + (bCX * currentBurst);
// 					const oy = v[1] + (bCY * currentBurst);
// 					const oz = v[2] + (bCZ * currentBurst);
// 					const perspective = FOV / (FOV + oz);
// 					pointsStr += `${cx + ox * perspective * baseScale},${cy + oy * perspective * baseScale} `;
// 				}
// 				baseFaceEl.setAttribute("points", pointsStr);
// 				drawOrder.push({ z: bCZ, el: baseFaceEl });
// 			}

// 			// Edges
// 			const showEdges = currentBurst < 0.01;
// 			for (let i = 0; i < PYRAMID_EDGES.length; i++) {
// 				const el = edgeEls[i];
// 				if (showEdges) {
// 					const a = rotV[PYRAMID_EDGES[i][0]];
// 					const b = rotV[PYRAMID_EDGES[i][1]];
// 					const pA = FOV / (FOV + a[2]);
// 					const pB = FOV / (FOV + b[2]);
// 					el.setAttribute("visibility", "visible");
// 					el.setAttribute("x1", (cx + a[0] * pA * baseScale).toString());
// 					el.setAttribute("y1", (cy + a[1] * pA * baseScale).toString());
// 					el.setAttribute("x2", (cx + b[0] * pB * baseScale).toString());
// 					el.setAttribute("y2", (cy + b[1] * pB * baseScale).toString());
// 					drawOrder.push({ z: (a[2] + b[2]) * 0.5, el });
// 				}
// 				else {
// 					el.setAttribute("visibility", "hidden");
// 				}
// 			}

// 			// Z-index sorting for SVG elements
// 			drawOrder.sort((a, b) => b.z - a.z);
// 			for (let i = 0; i < drawOrder.length; i++) {
// 				svg.appendChild(drawOrder[i].el);
// 			}

// 			requestID = requestAnimationFrame(animate);
// 		};

// 		requestID = requestAnimationFrame(animate);
// 		return () => {
// 			cancelAnimationFrame(requestID);
// 			resizeObserver.disconnect();
// 			if (svg)
// 				svg.innerHTML = "";
// 		};
// 	}, [color, faceOpacity, edgeThickness, borderRadius]);

// 	return (
// 		<div
// 			ref={containerRef}
// 			className={cn("relative w-full h-full min-h-[400px] overflow-hidden bg-transparent", className)}
// 			onMouseEnter={() => { isHovered.current = true; }}
// 			onMouseLeave={() => {
// 				isHovered.current = false;
// 				mouse.current.isDown = false;
// 			}}
// 		>
// 			<svg
// 				ref={svgRef}
// 				className="w-full h-full cursor-move overflow-visible"
// 				onMouseDown={(e) => {
// 					mouse.current = { isDown: true, lastX: e.clientX, lastY: e.clientY };
// 				}}
// 				onMouseMove={(e) => {
// 					if (!mouse.current.isDown)
// 						return;
// 					angles.current.y += (e.clientX - mouse.current.lastX) * 0.01;
// 					angles.current.x += (e.clientY - mouse.current.lastY) * 0.01;
// 					mouse.current.lastX = e.clientX;
// 					mouse.current.lastY = e.clientY;
// 				}}
// 				onMouseUp={() => { mouse.current.isDown = false; }}
// 			/>
// 		</div>
// 	);
// };

// export default OptimizedRelaxedPyramid;
import { useEffect, useRef } from "react";

import { cn } from "@/lib/utils/cn";

interface PyramidProps {
	className?: string;
	color?: string;
	faceOpacity?: number;
	edgeThickness?: number;
	borderRadius?: number;
}

const PYRAMID_VERTICES: [number, number, number][] = [
	[0, -0.8, 0], // 0: Apex (top)
	[0.7, 0.5, 0.7], // 1: Base front-right
	[0.7, 0.5, -0.7], // 2: Base back-right
	[-0.7, 0.5, -0.7], // 3: Base back-left
	[-0.7, 0.5, 0.7] // 4: Base front-left
];

const PYRAMID_TRIANGLE_FACES = [
	[0, 1, 2], // Right face
	[0, 2, 3], // Back face
	[0, 3, 4], // Left face
	[0, 4, 1] // Front face
];

const PYRAMID_BASE_FACE = [1, 4, 3, 2];

const PYRAMID_EDGES = [
	[0, 1],
	[0, 2],
	[0, 3],
	[0, 4],
	[1, 2],
	[2, 3],
	[3, 4],
	[4, 1]
];

const FOV = 400;

const rotateVertex = (
	v: [number, number, number],
	cX: number,
	sX: number,
	cY: number,
	sY: number,
	cZ: number,
	sZ: number
): [number, number, number] => {
	let [x, y, z] = v;
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

	return [tx, ty, z];
};

const OptimizedRelaxedPyramid = ({
	className,
	color = "#ffdd00",
	faceOpacity = 0.5,
	edgeThickness = 0,
	borderRadius = 10
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

		// Create triangle face elements
		const triangleFaceEls = PYRAMID_TRIANGLE_FACES.map(() => {
			const el = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
			el.setAttribute("fill", color);
			el.setAttribute("fill-opacity", faceOpacity.toString());
			el.setAttribute("stroke", color);
			el.setAttribute("stroke-linejoin", "round");
			svg.appendChild(el);
			return el;
		});

		// Create base face element
		const baseFaceEl = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
		baseFaceEl.setAttribute("fill", color);
		baseFaceEl.setAttribute("fill-opacity", faceOpacity.toString());
		baseFaceEl.setAttribute("stroke", color);
		baseFaceEl.setAttribute("stroke-linejoin", "round");
		svg.appendChild(baseFaceEl);

		// Create edge elements
		const edgeEls = PYRAMID_EDGES.map(() => {
			const el = document.createElementNS("http://www.w3.org/2000/svg", "line");
			el.setAttribute("stroke", color);
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

		let requestID: number;
		const rotV: [number, number, number][] = [[0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0]];

		const animate = () => {
			const { w, h } = dims.current;
			if (w === 0 || h === 0) {
				requestID = requestAnimationFrame(animate);
				return;
			}

			const cx = w / 2;
			const cy = h / 2;
			const baseScale = Math.min(w, h) * 0.28;

			// --- SCALE FIX ---
			// We calculate a responsive stroke width based on the current baseScale.
			// 100 is a reference constant. If borderRadius is 12 and scale is 100, stroke is 12.
			const responsiveBorder = (borderRadius * baseScale) / 100;
			const responsiveEdge = (edgeThickness * baseScale) / 100;

			if (!mouse.current.isDown) {
				angles.current.x += 0.002;
				angles.current.y += 0.003;
			}

			const targetBurst = isHovered.current ? 0.6 : 0;
			burst.current += (targetBurst - burst.current) * 0.08;

			const cosX = Math.cos(angles.current.x);
			const sinX = Math.sin(angles.current.x);
			const cosY = Math.cos(angles.current.y);
			const sinY = Math.sin(angles.current.y);
			const cosZ = Math.cos(angles.current.z);
			const sinZ = Math.sin(angles.current.z);

			for (let i = 0; i < 5; i++) {
				rotV[i] = rotateVertex(PYRAMID_VERTICES[i], cosX, sinX, cosY, sinY, cosZ, sinZ);
			}

			const drawOrder: { z: number; el: SVGElement }[] = [];
			const currentBurst = burst.current;

			// Render triangle faces
			for (let i = 0; i < PYRAMID_TRIANGLE_FACES.length; i++) {
				const indices = PYRAMID_TRIANGLE_FACES[i];
				const v0 = rotV[indices[0]];
				const v1 = rotV[indices[1]];
				const v2 = rotV[indices[2]];

				const bCX = (v0[0] + v1[0] + v2[0]) * 0.3333;
				const bCY = (v0[1] + v1[1] + v2[1]) * 0.3333;
				const bCZ = (v0[2] + v1[2] + v2[2]) * 0.3333;

				let pointsStr = "";
				for (let j = 0; j < 3; j++) {
					const v = rotV[indices[j]];
					const ox = v[0] + (bCX * currentBurst);
					const oy = v[1] + (bCY * currentBurst);
					const oz = v[2] + (bCZ * currentBurst);
					const perspective = FOV / (FOV + oz);
					pointsStr += `${cx + ox * perspective * baseScale},${cy + oy * perspective * baseScale} `;
				}

				const el = triangleFaceEls[i];
				el.setAttribute("points", pointsStr);
				el.setAttribute("stroke-width", responsiveBorder.toString()); // Apply responsive scale
				drawOrder.push({ z: bCZ, el });
			}

			// Render base face
			{
				const indices = PYRAMID_BASE_FACE;
				const v0 = rotV[indices[0]];
				const v1 = rotV[indices[1]];
				const v2 = rotV[indices[2]];
				const v3 = rotV[indices[3]];

				const bCX = (v0[0] + v1[0] + v2[0] + v3[0]) * 0.25;
				const bCY = (v0[1] + v1[1] + v2[1] + v3[1]) * 0.25;
				const bCZ = (v0[2] + v1[2] + v2[2] + v3[2]) * 0.25;

				let pointsStr = "";
				for (let j = 0; j < 4; j++) {
					const v = rotV[indices[j]];
					const ox = v[0] + (bCX * currentBurst);
					const oy = v[1] + (bCY * currentBurst);
					const oz = v[2] + (bCZ * currentBurst);
					const perspective = FOV / (FOV + oz);
					pointsStr += `${cx + ox * perspective * baseScale},${cy + oy * perspective * baseScale} `;
				}

				baseFaceEl.setAttribute("points", pointsStr);
				baseFaceEl.setAttribute("stroke-width", responsiveBorder.toString()); // Apply responsive scale
				drawOrder.push({ z: bCZ, el: baseFaceEl });
			}

			const showEdges = currentBurst < 0.01;
			for (let i = 0; i < PYRAMID_EDGES.length; i++) {
				const el = edgeEls[i];
				if (showEdges && edgeThickness > 0) {
					const a = rotV[PYRAMID_EDGES[i][0]];
					const b = rotV[PYRAMID_EDGES[i][1]];
					const pA = FOV / (FOV + a[2]);
					const pB = FOV / (FOV + b[2]);

					el.setAttribute("visibility", "visible");
					el.setAttribute("stroke-width", responsiveEdge.toString()); // Apply responsive scale
					el.setAttribute("x1", (cx + a[0] * pA * baseScale).toString());
					el.setAttribute("y1", (cy + a[1] * pA * baseScale).toString());
					el.setAttribute("x2", (cx + b[0] * pB * baseScale).toString());
					el.setAttribute("y2", (cy + b[1] * pB * baseScale).toString());
					drawOrder.push({ z: (a[2] + b[2]) * 0.5, el });
				}
				else {
					el.setAttribute("visibility", "hidden");
				}
			}

			drawOrder.sort((a, b) => b.z - a.z);
			for (let i = 0; i < drawOrder.length; i++) {
				svg.appendChild(drawOrder[i].el);
			}

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
			className={cn("relative w-full h-full min-h-[200px] overflow-hidden bg-transparent", className)}
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
