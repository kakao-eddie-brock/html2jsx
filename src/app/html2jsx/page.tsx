import Html2Jsx from "@/app/components/Html2Jsx";
import HTMLtoJSX from "htmltojsx";
import Link from "next/link";
import {useCallback} from "react";

export default function Home() {
  const transformer =
      useCallback(async ({html, cxName = 'cx'}: {html: string, cxName: string}): Promise<string> => {
        'use server'
        const converter = new HTMLtoJSX({
          createClass: false
        });
        let result = converter.convert(html)

            const regex = /\s(className=)['"][0-9a-zA-Z_\s]*['"]/g
            result = result.replace(regex, match => {
                const separator = match[11]
                const classNames = match.split(separator)[1].split(' ')
                return ` className={${cxName}(${classNames
                    .map(className => `"${className}"`)
                    .join(', ')})}`
            })
        return result
      }, [])
  return (
      <main className="min-h-screen mt-4">
          <div className={'text-center'}>
              <Link href={'/'}>Home</Link>
          </div>
        <Html2Jsx transformer={transformer}/>
      </main>
  );
}


