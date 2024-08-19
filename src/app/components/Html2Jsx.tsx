'use client'
import React, {useEffect, useState} from "react";


const Html2Jsx = ({transformer}: {transformer: ({html, cxName}: {html: string, cxName:string}) => Promise<string>}) => {
    const [inputHtml, setInputHtml] = useState('')
    const [outputHtml, setOutputHtml] = useState('')
    const [cxName, setCxName] = useState('cx')
    const handleInputHtml = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
        setInputHtml(e.target.value)
    }
    const handleCxName = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setCxName(e.target.value)
    }
    useEffect(() => {
        async function transform() {
            try {

                const result = await transformer({
                    html:inputHtml,
                    cxName
                });
                setOutputHtml(result)

            } catch (e) {
                console.error(e);
            }
        }


        transform();

    }, [cxName, inputHtml, transformer]);

    return (
        <>
            <label htmlFor={'cxName'}> prefix
            <input name={'cxName'} value={cxName} onChange={handleCxName} className={'text-black'} />
            </label>
        <div className={'flex mt-4 justify-evenly'}>
            <textarea value={inputHtml} onChange={handleInputHtml} className={'w-1/3 color text-black h-[50vh]'} defaultValue={inputHtml}/>
            <textarea value={outputHtml} className={'w-1/3 color text-black h-[50vh]'}/>
        </div>
        </>
    )
}

export default Html2Jsx