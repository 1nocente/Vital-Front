"use client";


import NavBar from "../NavBar";

const NavBarLayout = ({children}) => {
    return(
        <div className="flex">
            <NavBar></NavBar>
            {/* <Header /> */}
            <main className="w-full">
                {children}
            </main>
        </div>
    )
}

export default NavBarLayout