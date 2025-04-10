import { Handle, Position } from "reactflow";

export function LambdaFunctionNode({
  data
}) {
  return (
    <div
      className="px-4 py-2 shadow-md rounded-md bg-white border border-gray-200 w-48">
      <div className="flex items-center">
        <div className="w-10 h-10 flex-shrink-0 mr-2">
          {/* <img
            src="/images/aws/lambda.png"
            alt="Lambda Function"
            className="w-full h-full object-contain" /> */}
        </div>
        <div>
          <div className="text-sm font-bold">{data.label}</div>
          <div className="text-xs text-gray-500">Node.js</div>
        </div>
      </div>
      <Handle type="target" position={Position.Top} className="w-3 h-3" />
      <Handle type="source" position={Position.Bottom} className="w-3 h-3" />
    </div>
  );
}
