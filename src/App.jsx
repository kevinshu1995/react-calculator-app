import React from "react";
import Clsx from "clsx";

function Button({ theme, text, onClick, extraClass, padding }) {
    const [_theme, _type] = theme;
    const btnTheme = {
        blue: {
            normal: Clsx(
                "text-3xl",
                "bg-main-white border-gray text-main-gray",
                "hover:bg-white active:border-white"
            ),
            special: Clsx(
                "text-xl",
                "bg-main-blue-light border-[#414E73] text-white",
                "hover:bg-main-blue-lighter active:border-main-blue-lighter"
            ),
            submit: Clsx(
                "text-xl",
                "bg-main-orange text-white border-[#93261A]",
                "hover:bg-main-orange-light active:border-main-orange-light"
            ),
        },
    };
    return (
        <button
            onClick={onClick}
            className={Clsx(
                btnTheme[_theme][_type],
                "font-bold border-b-4 rounded-xl transition-all active:translate-y-0.5",
                extraClass,
                padding || "py-2.5"
            )}
        >
            {text}
        </button>
    );
}

function App() {
    function onClick(e) {
        console.log(e);
    }
    const theme = "blue";
    const buttons = [
        {
            text: "7",
            theme: [theme, "normal"],
        },
        {
            text: "8",
            theme: [theme, "normal"],
        },
        {
            text: "9",
            theme: [theme, "normal"],
        },
        {
            text: "DEL",
            theme: [theme, "special"],
        },
        {
            text: "4",
            theme: [theme, "normal"],
        },
        {
            text: "5",
            theme: [theme, "normal"],
        },
        {
            text: "6",
            theme: [theme, "normal"],
        },
        {
            text: "+",
            theme: [theme, "normal"],
        },
        {
            text: "1",
            theme: [theme, "normal"],
        },
        {
            text: "2",
            theme: [theme, "normal"],
        },
        {
            text: "3",
            theme: [theme, "normal"],
        },
        {
            text: "-",
            theme: [theme, "normal"],
        },
        {
            text: ".",
            theme: [theme, "normal"],
        },
        {
            text: "0",
            theme: [theme, "normal"],
        },
        {
            text: "/",
            theme: [theme, "normal"],
        },
        {
            text: "x",
            theme: [theme, "normal"],
        },
    ];
    return (
        <div className="min-h-screen flex items-center justify-center bg-main-blue">
            <div className="max-w-[540px] min-w-[327px] w-full flex-column space-y-8">
                <div className="flex justify-between w-full">
                    <h1 className="text-white text-3xl">calc</h1>
                    {/* Toggler */}
                    <div className="flex text-white items-center">
                        <p className="text-xs">THEME</p>
                    </div>
                </div>
                <div className="flex-column space-y-6">
                    <div className="bg-main-blue-darker flex justify-end text-white rounded-xl text-5xl p-10">
                        399,981
                    </div>
                    <div className="bg-main-blue-dark rounded-xl p-8">
                        <div className="grid grid-cols-4 gap-6">
                            {buttons.map(btn => (
                                <Button
                                    key={`Button-${btn.text}`}
                                    text={btn.text}
                                    theme={btn.theme}
                                    onClick={onClick}
                                />
                            ))}
                            <Button
                                extraClass="col-span-2"
                                padding="py-4"
                                theme={[theme, "special"]}
                                onClick={onClick}
                                text="RESET"
                            />
                            <Button
                                extraClass="col-span-2"
                                padding="py-4"
                                theme={[theme, "submit"]}
                                onClick={onClick}
                                text="="
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
