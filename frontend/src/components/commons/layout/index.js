import Header from "../header";
import Footer from "../footer";

const Layout = ({children, page}) => {
    return(
        <>
            <Header page={page}/>
                {children}
            <Footer/>
        </>
    )    
}

export default Layout;