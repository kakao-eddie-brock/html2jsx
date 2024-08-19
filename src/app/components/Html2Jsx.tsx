'use client'
import React, {useEffect, useState} from "react";


const Html2Jsx = ({transformer}: {transformer: ({html, useCx}: {html: string, useCx:boolean}) => Promise<string>}) => {
    const [inputHtml, setInputHtml] = useState('')
    const [outputHtml, setOutputHtml] = useState('')
    const [useCx, setUseCx] = useState(false)
    const handleInputHtml = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
        setInputHtml(e.target.value)
    }
    useEffect(() => {
        async function transform() {
            try {

                const result = await transformer({
                    html:inputHtml,
                    useCx
                });
                setOutputHtml(result)

            } catch (e) {
                console.error(e);
            }
        }


        transform();

    }, [inputHtml, transformer, useCx]);

    return (
        <>
            <label htmlFor={'checkbox'}> 클래스 네임 사용 여부
            <input name={'checkbox'} type={'checkbox'} checked={useCx} onChange={() => {setUseCx((prev) => !prev)}}/>
            </label>
        <div className={'flex mt-4 justify-evenly'}>
            <textarea value={inputHtml} onChange={handleInputHtml} className={'w-1/3 color text-black h-[50vh]'} defaultValue={inputHtml}/>
            <textarea value={outputHtml} className={'w-1/3 color text-black h-[50vh]'}/>
        </div>
        </>
    )
}

export default Html2Jsx