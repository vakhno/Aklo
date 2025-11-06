import { AlertTriangle } from "lucide-react";

const RuleWarningMessage = () => {
	return (
		<div className="mb-2 w-full rounded-md border border-yellow-300 bg-yellow-50 p-2 text-yellow-900 flex items-center gap-2">
			<AlertTriangle className=" shrink-0 text-yellow-600" />
			<span>By being on this page, you agree to the Rules, Terms, and Privacy Policy.</span>
		</div>
	);
};

export default RuleWarningMessage;
