import TopHeader from "../components/layout/TopHeader.tsx";
import Header from "../components/layout/Header.tsx";
import { Outlet } from "react-router";
import Footer from "../components/layout/Footer.tsx";
import useLayoutStore from "../store/useLayoutStore.ts";
import { twMerge } from "tailwind-merge";

function Layout() {
    const { isTopBannerVisible, topBannerHeight } = useLayoutStore();
    return (
        <div className={twMerge(["min-h-screen", "flex", "flex-col"])}>
            {/*TopHeader는 처음에는 fixed
            사용자가 스크롤을 조금이라도 내리게 되면 화면에서 사라짐*/}
            <div className={twMerge(["fixed", "top-0", "left-0", "right-0", "z-index-60"])}>
                <TopHeader />
            </div>
            {/*
            1.TopHeader가 나오고 있는 상황 ->sticky top-9 백그라운드 투명
            2.TopHeader가 나오지 않는 상황 ->sticky top-0 백그라운드 white
            */}
            <Header />
            <main>
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}
export default Layout;
