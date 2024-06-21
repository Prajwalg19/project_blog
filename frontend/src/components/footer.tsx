import {Footer} from "flowbite-react";
const FooterComponent = () => {
    return (
        <Footer container className="border-t-red-400 dark:bg-black dark:text-white text-black border-t-[6px]">
            <div className="flex flex-col gap-10 w-full">
                <main className="flex flex-col items-center gap-10 md:gap-0 md:items-center md:flex-row md:justify-around w-full">
                    <div className="flex flex-col gap-6">
                        <div className="flex flex-row md:justify-start justify-center items-center gap-1 whitespace-nowrap">
                            <span className="bg-gradient-to-r from-purple-600 to-green-500 text-white px-2 py-1 rounded-lg">Your </span>
                            <span>Blog</span>
                        </div>
                        <span className="flex flex-col gap-6 md:items-start items-center text-gray-500 text-sm">
                            <a href="mailto:prajw4l.g@gmail.com">prajw4lg@gmail.com</a>
                            <p>+91 7975158795</p>
                        </span>
                    </div>
                    <span className="flex flex-col gap-6 md:items-start items-center text-gray-500 text-sm">
                        <p className="text-lg font-medium">Follow me</p>
                        <a href="https://github.com/prajwalg19">Github</a>
                        <p>X.com</p>
                    </span>
                    <span className="flex flex-col gap-6 md:items-start items-center text-gray-500 text-sm">
                        <p className="text-lg font-medium">About</p>
                        <a href="https://www.prajwal19.me" target="_blank" rel="noopener noreferrer">www.prajwal19.me</a>
                    </span>
                </main>
                <hr />
                <span className="text-xs text-gray-500 text-center">&copy; {new Date().getFullYear()} Prajwal Gowda G. All rights reserved</span>

            </div>
        </Footer>
    )
}

export default FooterComponent;

