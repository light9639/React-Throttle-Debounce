import React, { useState, useEffect } from "react";

export default function Debounce(): JSX.Element {
    const [value1, setValue1] = useState<string>("");
    const [value2, setValue2] = useState<string>("");

    const handleChange1 = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue1(e.target.value);
    }

    const handleChange2 = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue2(e.target.value);
    }

    useEffect(() => {
        console.log("일반입력:", value1);
    }, [value1]);

    useEffect(() => {
        const debounce = setTimeout(() => {
            console.log("디바운스 입력:", value2);
        }, 1000);
        return () => clearTimeout(debounce);
    }, [value2]);

    return (
        <React.Fragment>
            <div className="InputBox">
                {/* input에 한글자씩 입력하면 콘솔창에 출력 */}
                일반 입력 : <input value={value1} onChange={handleChange1} />
            </div>
            <div className="InputBox">
                {/* input에서 입력이 완료되면 콘솔창에 출력 */}
                디바운스 입력 : <input value={value2} onChange={handleChange2} />
            </div>
        </React.Fragment>
    );
}
