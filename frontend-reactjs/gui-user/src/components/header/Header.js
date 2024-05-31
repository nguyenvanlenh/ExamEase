import "./header.scss";
import React, { useEffect, useState } from 'react'
import { Button, Nav, NavDropdown } from 'react-bootstrap'
import imgAccount from '../../data/imgs/user_icon.webp'
import { Link } from "react-router-dom";
import { authLocalStorage } from "../../utils/localStorage";

function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleMenuToggle = () => {
        setIsMenuOpen(!isMenuOpen);
    };
    const [auth, setAuth] = useState(false);
    useEffect(() => {
        const authLocal = authLocalStorage.get();
        if (authLocal?.authenticated) {
            setAuth(authLocal?.authenticated);
        }
    }, []);

    const handleLogOut = () => {
        localStorage.removeItem('auth');
        localStorage.removeItem('username');
        localStorage.removeItem('category');
        localStorage.removeItem('timeExam');
        localStorage.removeItem('examSaved');
        setAuth(false);
        setIsMenuOpen(false)
    }

    return (
        <>
            <div id="id-header" style={{ height: isMenuOpen ? 'auto' : '64px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div className="p-2 fs-2 fw-bold">
                        <Nav.Link href="home">Study</Nav.Link>
                    </div>
                    <div className="content">
                        <div className="p-3 ms-auto">
                            <Nav.Link href="home" className="text-item">Cộng đồng</Nav.Link>
                        </div>
                        <div className="p-3">
                            <Link to="/list-exams" className="text-item">Đề thi online</Link>
                        </div>
                        <div className="p-3">
                            <Nav.Link href="#home" className="text-item">Đề thi của tôi</Nav.Link>
                        </div>
                        <div className="p-3">
                            <Nav.Link href="#home" className="text-item">Liên hệ</Nav.Link>
                        </div>
                        <div className="p-3">
                            {
                                auth ? (
                                    <NavDropdown className="text-item"
                                        title={<span><img className="img-account"
                                            src={imgAccount} alt="Avatar" /></span>}
                                        id="basic-nav-dropdown">
                                        <NavDropdown.ItemText style={{ color: '#8c98a4', fontWeight: 600 }}>Thông báo</NavDropdown.ItemText>
                                        <NavDropdown.ItemText style={{ width: '250px', fontSize: '14px' }}>Bạn chưa có thông báo mới.</NavDropdown.ItemText>
                                        <NavDropdown.ItemText style={{ width: '250px', fontSize: '14px' }}>
                                            <Link to="/create-exam" className="text-item">Tạo bài thi</Link>
                                        </NavDropdown.ItemText>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item href="account">Trang cá nhân</NavDropdown.Item>
                                        <NavDropdown.ItemText onClick={handleLogOut}>Đăng xuất</NavDropdown.ItemText>
                                    </NavDropdown>
                                ) :
                                    (<Button className="btn-login"><Link to={"/login"}>Đăng nhập</Link></Button>)
                            }

                        </div>
                    </div>
                    {
                        auth ? (<div className="container-menu" onClick={handleMenuToggle}>
                            <svg width={24} height={24} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" /></svg>
                        </div>) : (<Button className="container-menu btn-login-menu"><Link to={"/login"}>Đăng nhập</Link></Button>)
                    }

                </div>
                <div className={`content-menu-mobile`} style={{ display: isMenuOpen ? 'block' : 'none' }}>
                    <div className="p-2 ms-auto">
                        <Nav.Link href="home" className="text-item">Cộng đồng</Nav.Link>
                    </div>
                    <div className="p-2">
                        <Link to="/list-exams" className="text-item">Đề thi online</Link>
                    </div>
                    <div className="p-2">
                        <Nav.Link href="#home" className="text-item">Đề thi của tôi</Nav.Link>
                    </div>
                    <div className="p-2">
                        <Nav.Link href="#home" className="text-item">Liên hệ</Nav.Link>
                    </div>
                    <div className="p-2">
                        <Nav.Link href="#home" className="text-item">Trang cá nhân</Nav.Link>
                    </div>
                    <div className="p-2">
                        <Link to="/create-exam" className="text-item">Tạo đề thi</Link>
                    </div>
                    <div className="p-2">
                        <Nav.Link onClick={handleLogOut} className="text-item">Đăng xuất</Nav.Link>
                    </div>
                </div>
            </div>
            <div style={{ height: '64px' }}></div>
        </>

    )
}

export default Header
