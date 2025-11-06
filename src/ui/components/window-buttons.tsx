import { Maximize, Minus, X } from "lucide-react";

export const WindowButtons = () => {
    return (
        <div className="window-buttons flex  [&>div]:hover:bg-[#e7e5e4] dark:[&>div]:hover:bg-[#1c1917]">
            <div className="p-2 flex justify-center align-center"
                onClick={() => window.electron.sendFrameAction("MINIMIZE")}>
                <Minus className="size-5 text-black dark:text-[#e7e5e4]" />
            </div>
            <div className="p-2 flex justify-center align-center"
                onClick={() => window.electron.sendFrameAction("MAXIMIZE")}>
                <Maximize className="size-5 text-black dark:text-[#e7e5e4]" />
            </div>
            <div className="p-2 flex justify-center align-center"
                onClick={() => window.electron.sendFrameAction("CLOSE")}>
                <X className="size-5 text-black dark:text-[#e7e5e4]" />
            </div>
        </div>
    )
};