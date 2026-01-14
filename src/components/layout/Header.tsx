import Logo from "../../assets/images/logo_bk.svg";
import { Link, useLocation } from "react-router";
import useLayoutStore from "../../store/useLayoutStore.ts";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import { IoMenu, IoSearch } from "react-icons/io5";

const MENU = [
    {
        name: "RUNNING",
        path: "/running",
        subMenu: [
            { name: "신발", path: "/running/shoes" },
            { name: "의류", path: "/running/clothes" },
            { name: "악세사리", path: "/running/accessories" },
        ],
    },
    {
        name: "SPORTS STYLE",
        path: "/sports-style",
        subMenu: [
            { name: "신발", path: "/sports-style/shoes" },
            { name: "의류", path: "/sports-style/clothes" },
            { name: "악세사리", path: "/sports-style/accessories" },
        ],
    },
    {
        name: "HERITAGE",
        path: "/heritage",
        subMenu: [
            { name: "마라톤 110 파리", path: "/heritage/110-paris" },
            { name: "마라톤 110", path: "/heritage/110" },
            { name: "마라톤 220", path: "/heritage/220" },
            { name: "그랜드 슬램 82", path: "/heritage/grand-slam-82" },
        ],
    },
    {
        name: "SPORTS",
        path: "/sports",
        subMenu: [
            { name: "야구", path: "/sports/baseball" },
            { name: "축구", path: "/sports/football" },
            { name: "농구", path: "/sports/basketball" },
            { name: "기타", path: "/sports/other" },
        ],
    },
    { name: "ONE SPEC", path: "/one-spec", subMenu: [] },
    {
        name: "OUR STORY",
        path: "/our-story",
        subMenu: [
            { name: "공식 후원", path: "/our-story/sponsorship" },
            { name: "브랜드 선언", path: "/our-story/manifesto" },
            { name: "시즌 컬렉션", path: "/our-story/collection" },
            { name: "브랜드 가이드", path: "/our-story/guide" },
            { name: "이벤트", path: "/our-story/event" },
        ],
    },
];

function Header() {
    const { pathname } = useLocation();
    const { isTopBannerVisible } = useLayoutStore();

    //스크롤이 내려갔는지 안 내려갔는지를 체크해서 스타일링을 해줘야함
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        //사용자가 스크롤을 조금이라도 움직이면 이 handleScroll이라고 하는 함수가 발동되는데
        //만약 사용자가 Y스크롤의 값을 0보다 크게 가져간다면 ( 스크롤을 내렸다면)
        //setIsScrolled의 값을 true로 변환 Y 스크롤의 값이 0이 된다면 false 변환
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0);
        };

        //addEventListener(동장방식, 함수);
        //addEventListener : 동작방식에 기재한 것을 감지하여 함수를 실행하는 메소드
        //창 자체에 scroll 이벤트를 감지하는 함수를 만듦
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);
    const isMenuOpen = hoveredMenu !== null;
    // 사용자가 홈에 위치할때만 true
    const isHome = pathname === "/";

    //배경이 투명일 경우엔 사용자가 Home에 위치하고 스크롤이 맨 위에 있을때만
    const isTransparent = isHome && !isScrolled;

    return (
        <header
            //onMouseLeave : 이 요소에서 마우스가 떠나게 되면 발동되는 함수
            //onMouseEnter : 이 요소에서 마우스가 들어오면 발동되는 함수
            onMouseLeave={() => setHoveredMenu(null)}
            className={twMerge(
                ["sticky", "left-0", "right-0", "z-60"],
                ["transition-all", "duration-300", "border-b"],
                isTransparent
                    ? ["bg-transparent", "border-transparent", "text-white"]
                    : ["bg-white", "border-gray-100"],
                isMenuOpen && ["bg-white", "border-gray-100", "text-gray-600", "duration-0"],
                isTopBannerVisible ? ["top-9"] : ["top-0"],
            )}>
            <div
                className={twMerge(
                    ["container", "mx-auto", "px-4", "h-20"],
                    ["flex", "justify-between", "items-center"],
                )}>
                {/*왼쪽영역*/}
                <div className={twMerge(["flex", "items-center", "gap-5"])}>
                    <button className={twMerge(["lg:hidden", "text-2xl"])}>
                        <IoMenu />
                    </button>
                    <Link to={"/"} className={"w-40"}>
                        <img src={Logo} alt={"logo"} />
                    </Link>
                    <nav
                        className={twMerge(
                            ["hidden", "lg:flex", "flex-1"],
                            ["justify-center", "gap-10"],
                            ["font-bold"],
                        )}>
                        {/*메뉴 구성*/}
                        {MENU.map(menu => (
                            <div
                                onMouseEnter={() => setHoveredMenu(menu.name)}
                                key={menu.name}
                                className={twMerge(
                                    ["relative", "w-30"],
                                    ["h-full", "flex", "items-center"],
                                )}>
                                <Link
                                    key={menu.name}
                                    to={menu.path}
                                    className={twMerge(
                                        ["relative"],
                                        ["py-4", "hover:text-red-600", "transition-colors"],
                                    )}>
                                    {menu.name}
                                    <span
                                        className={twMerge(
                                            ["absolute", "bottom-0", "left-0", "h-[2px]"],
                                            hoveredMenu === menu.name ? "w-full" : "w-0",
                                            ["bg-red-600", "transition-all", "duration-300"],
                                        )}
                                    />
                                </Link>
                            </div>
                        ))}
                    </nav>
                </div>

                {/*오른쪽영역*/}
                <div className={twMerge(["w-100", "flex", "justify-end", "items-center","gap-3"])}>
                    <div className={twMerge(["relative", "hidden", "md:block"])}>
                        <input
                            className={twMerge(
                                ["w-40", "py-1"],
                                ["border-b", "border-black"],
                                ["focus:w-60", "focus:outline-none"],
                                ["transition-all"],
                                isTransparent
                                    ? [
                                          "bg-transparent",
                                          "border-white",
                                          "text-white",
                                          "placeholder:text-white",
                                      ]
                                    : ["border-black"],
                                isMenuOpen && ["border-black"],
                            )}
                            placeholder={"검색"}
                        />
                        <button className={twMerge(["absolute", "right-0", "top-2"])}>
                            <IoSearch />
                        </button>
                    </div>
                    <Link
                        to={"/login"}
                        className={twMerge(["text-sm", "font-bold", "hidden", "md:block"])}>
                        LOGIN
                    </Link>
                    <Link
                        to={"/cart"}
                        className={twMerge(["text-sm", "font-bold", "hidden", "md:block"])}>
                        CART
                    </Link>
                </div>
            </div>

            {/*메가 메뉴*/}
            {/*TopHeader 있을때 없을때 2가지 요소 존재
            TopHeader 높이는 36px (9) Header 높이는 80px (20)
            */}
            <div
                className={twMerge(
                    ["absolute", "left-0", "w-full", "overflow-hidden", "z-50"],
                    isTopBannerVisible ? "top-17" : "top-11",
                    ["border-t", "border-gray-100"],
                    ["bg-white", "text-gray-600"],
                    ["transition-all", "duration-300"],
                    isMenuOpen
                        ? ["h-64", "opacity-100", "border-b"]
                        : ["h-0", "opacity-0", "border-none"],
                )}>
                <div
                    className={twMerge(
                        ["container", "mx-auto", "px-4"],
                        ["flex", "justify-between"],
                    )}>
                    {/*왼쪽영역*/}
                    <div className={twMerge(["flex", "items-center", "gap-5"])}>
                        <div className={twMerge(["w-40", "invisible"])} />
                        <div
                            className={twMerge(
                                ["hidden", "lg:flex", "flex-1"],
                                ["justify-center", "gap-10"],
                                ["font-bold"],
                            )}>
                            {/*메뉴 구성*/}
                            {MENU.map(menu => (
                                <ul
                                    key={menu.name}
                                    className={twMerge(["flex", "flex-col", "gap-3", "w-30"])}>
                                    {menu.subMenu.map(subMenu => (
                                        <li key={subMenu.name} className={twMerge()}>
                                            <Link
                                                to={subMenu.path}
                                                className={twMerge(
                                                    ["py-2", "block", "text-sm", "text-gray-500"],
                                                    ["hover:text-red-600"],
                                                )}>
                                                {subMenu.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            ))}
                        </div>
                    </div>

                    {/*오른쪽영역*/}
                    <div className={twMerge(["w-100", "invisible"])}></div>
                </div>
            </div>
        </header>
    );
}
export default Header;
