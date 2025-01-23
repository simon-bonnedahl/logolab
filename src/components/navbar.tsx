import { ModeToggle } from "./mode-toggle"
import { RotatingLogo } from "./rotating-logo";
import { GitHubStars } from "./github-stars";

export const Navbar = () => {
    return (
        <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className=" flex h-14 items-center justify-between  px-4">
                <div className="flex items-center gap-6 font-semibold">
                    <div className="flex items-center gap-2">
                        <RotatingLogo />
                        <h1 className="text-xl">LogoLab</h1>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <a 
                        href="https://github.com/simon-bonnedahl/logolab" 
                        target="_blank" 
                        rel="noreferrer"
                        className="hover:text-foreground/80 transition-colors flex items-center gap-2"
                    >
                        GitHub
                        <GitHubStars />
                    </a>
                    <ModeToggle />
                </div>
            </div>
        </div>
    )
}