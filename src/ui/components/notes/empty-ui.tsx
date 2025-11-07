import { memo } from "react";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";

export default memo((props: {onClick: Function}) => {
    return (
        <div className="w-full h-full flex items-center justify-center">
            <Button onClick={() => props.onClick()} className="bg-transparent [&:hover]:bg-transparent text-stone-800 dark:text-stone-300">
                <Plus className="w-[25px] h-[25px]" /> 
                New note
            </Button>
        </div>
    )
})