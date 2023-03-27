import { Fragment } from "react";
import MainHeader from "./main-header";

function Layout(props) {
    return <Fragment>
        <main>
            <MainHeader />
            {props.children}
        </main>
    </Fragment>
}

export default Layout;