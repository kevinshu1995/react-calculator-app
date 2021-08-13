import React, { useState, useEffect } from "react";
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
    const [calculation, setCalculation] = useState([]);
    const [current, setCurrent] = useState(0);
    const [Answer, setAnswer] = useState(0);

    useEffect(() => {
        if (calculation[calculation.length - 1] && !calculation[calculation.length - 1].mark) {
            const ans = calculation.reduce((final, current) => {
                const mark = current.mark === "x" ? "*" : current.mark;
                return (final += `${current.number}${mark}`);
            }, "");
            setAnswer(eval(ans));
            setCalculation([]);
        }
    }, [calculation]);

    function onClick(value) {
        dealNumberAndDot(value);
        dealMarks(value);
        dealReset(value);
        dealDel(value);
        // console.log("calculation", calculation);
    }

    function pushCurrent(mark = "") {
        // 把 current 轉成數字，加上 mark 一起推到 calculation
        setCalculation([
            ...calculation,
            {
                number: Number(current),
                mark: mark,
            },
        ]);
        // reset
        setCurrent(0);
    }

    function dealMarks(mark) {
        doSthWhileMarks(mark, () => {
            if (mark === "=") mark = "";
            pushCurrent(mark);
        });
    }

    function doSthWhileMarks(value, fn) {
        switch (value) {
            case "+":
            case "-":
            case "x":
            case "/":
            case "=":
                fn();
                break;
            default:
                break;
        }
    }

    function dealDel(value) {
        if (value === "del") {
            if (String(current).length === 1) {
                setCurrent(0);
            } else {
                setCurrent(current.slice(0, -1));
            }
        }
    }

    function dealReset(value) {
        // TODO 要整個重製，不是重製 current
        if (value === "reset") {
            setCurrent(0);
            setAnswer(0);
            setCalculation([]);
        }
    }

    /**
     *
     * @param {String, Number} value
     * @return {String} 其實也沒有 return
     */
    function dealNumberAndDot(value) {
        setAnswer(0);
        if (typeof value === "number") setCurrent(dealNumber(value));
        if (value === ".") {
            if (!String(current).includes(".")) setCurrent(current + ".");
        }
    }

    function dealNumber(value) {
        let result = String(current).split("");
        current === 0 || current === "0" ? (result = [value]) : result.push(value);
        return result.join("");
    }

    const theme = "blue";
    const buttons = [
        {
            text: "7",
            data: 7,
            theme: [theme, "normal"],
        },
        {
            text: "8",
            data: 8,
            theme: [theme, "normal"],
        },
        {
            text: "9",
            data: 9,
            theme: [theme, "normal"],
        },
        {
            text: "DEL",
            data: "del",
            theme: [theme, "special"],
        },
        {
            text: "4",
            data: 4,
            theme: [theme, "normal"],
        },
        {
            text: "5",
            data: 5,
            theme: [theme, "normal"],
        },
        {
            text: "6",
            data: 6,
            theme: [theme, "normal"],
        },
        {
            text: "+",
            data: "+",
            theme: [theme, "normal"],
        },
        {
            text: "1",
            data: 1,
            theme: [theme, "normal"],
        },
        {
            text: "2",
            data: 2,
            theme: [theme, "normal"],
        },
        {
            text: "3",
            data: 3,
            theme: [theme, "normal"],
        },
        {
            text: "-",
            data: "-",
            theme: [theme, "normal"],
        },
        {
            text: ".",
            data: ".",
            theme: [theme, "normal"],
        },
        {
            text: "0",
            data: 0,
            theme: [theme, "normal"],
        },
        {
            text: "/",
            data: "/",
            theme: [theme, "normal"],
        },
        {
            text: "x",
            data: "x",
            theme: [theme, "normal"],
        },
    ];
    return (
        <div className="min-h-screen flex items-center justify-center bg-main-blue">
            <div className="max-w-[540px] min-w-[327px] w-full flex-column space-y-8 px-3 md:px-0">
                <div className="flex justify-between w-full">
                    <h1 className="text-white text-3xl">calc</h1>
                    {/* Toggler */}
                    <div className="flex text-white items-center">
                        <p className="text-xs">THEME</p>
                    </div>
                </div>
                <div className="flex-column space-y-6">
                    <div className="bg-main-blue-darker flex justify-end text-white rounded-xl text-5xl p-10">
                        {Answer || current}
                    </div>
                    <div className="bg-main-blue-dark rounded-xl p-8">
                        <div className="grid grid-cols-4 gap-4 md:gap-6">
                            {buttons.map(btn => (
                                <Button
                                    key={`Button-${btn.text}`}
                                    text={btn.text}
                                    theme={btn.theme}
                                    padding="pt-2.5 pb-2 md:py-2.5"
                                    onClick={() => onClick(btn.data)}
                                />
                            ))}
                            <Button
                                extraClass="col-span-2"
                                padding="pt-4 pb-3 md:py-4"
                                theme={[theme, "special"]}
                                onClick={() => onClick("reset")}
                                text="RESET"
                            />
                            <Button
                                extraClass="col-span-2"
                                padding="pt-4 pb-3 md:py-4"
                                theme={[theme, "submit"]}
                                onClick={() => onClick("=")}
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
