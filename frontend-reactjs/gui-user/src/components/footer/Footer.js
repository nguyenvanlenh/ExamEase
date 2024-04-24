import React from 'react'
import { Col, Container, Row, Stack } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import "./footer.scss";
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
function Footer() {
  return (
    <div id='id-footer'>
      <Container className='container'>
            <Row xs={12} lg={12} className='ml-row'>
                <Col sm={12} md={3}>
                    <Stack gap={9}>
                        <div className="title-footer">Study</div>
                        <div className="year">© 2024</div>
                        <Stack className='icons' direction="horizontal">
                            <Link><FacebookIcon /></Link>
                            <Link><InstagramIcon /></Link>    
                            <Link><TwitterIcon /></Link>    
                            <Link><LinkedInIcon /></Link>
                        </Stack>
                        
                    </Stack>
                </Col>
                <Col sm={6} md={3}>
                    <Stack gap={9}>
                        <div className="sub-title">Tài nguyên</div>
                        <div className="text-link"><Link>Thư viện đề thi</Link></div>
                        <div className="text-link"><Link>Blog</Link></div>
                        <div className="text-link"><Link>Kho tài liệu</Link></div>
                        <div className="text-link"><Link>Nhóm học tập</Link></div>
                    </Stack>
                </Col>
                <Col sm={6} md={3}>
                    <Stack gap={9}>
                        <div className="sub-title">Hỗ trợ</div>
                        <div className="text-link"><Link>Hướng dẫn sử dụng</Link></div>
                        <div className="text-link"><Link>Hướng dẫn mua hàng</Link></div>
                        <div className="text-link"><Link>Chăm sóc khách hàng</Link></div>
                        <div className="text-link"><Link>Phản hồi khiếu nại</Link></div>
                    </Stack>
                </Col>
                <Col sm={6} md={3}>
                    <Stack gap={9}>
                        <div className="sub-title">STUDY</div>
                        <div className="text-link"><Link>Về chúng tôi</Link></div>
                        <div className="text-link"><Link>Liên hệ</Link></div>
                        <div className="text-link"><Link>Điều khoản bảo mật</Link></div>
                        <div className="text-link"><Link>Điều khoản sử dụng</Link></div>
                    </Stack>
                </Col>
            </Row>
            <Row className='ml-row'>
                <Stack gap={9}>
                    <div className="sub-title">Thông tin doanh nghiệp</div>
                    <div className="text">Công ty TNHH Công Nghệ A Plus</div>
                    <div className="text">Giấy chứng nhận Đăng ký doanh nghiệp số: 0109675459 do Sở Kế hoạch và Đầu tư thành phố Hà Nội cấp ngày 17/06/2021.</div>
                    <div className="text">Điện thoại liên hệ/Hotline: 096 369 5525</div>
                    <div className="text">Email: nonglam@gmail.com.</div>
                </Stack>
            </Row>
            <Row className='copyright justify-content-md-center'>
                @ 2024 - Bản quyền của Công ty TNHH Công Nghệ DL.
            </Row>
      </Container>
    </div>
  )
}

export default Footer
