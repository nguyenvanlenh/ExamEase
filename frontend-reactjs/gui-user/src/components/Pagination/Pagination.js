import { Col, Pagination, Row } from "react-bootstrap";
import { v4 as uuidv4 } from 'uuid';
export const PaginationComponent = ({ currentPage, totalPages, onPageChange }) => {
    const createPaginationItems = () => {
        const paginationItems = [];
        const totalPagesToShow = 5;
        const ellipsis = <Pagination.Ellipsis key={uuidv4()} disabled />;

        // Trường hợp đặc biệt: tổng số trang ít hơn hoặc bằng totalPagesToShow
        if (totalPages <= totalPagesToShow) {
            for (let i = 0; i < totalPages; i++) {
                paginationItems.push(
                    <Pagination.Item
                        key={uuidv4()}
                        active={i === currentPage}
                        onClick={() => onPageChange(i)}
                    >
                        {i + 1}
                    </Pagination.Item>
                );
            }
        } else {
            // Hiển thị 2 trang bên trái và bên phải của trang hiện tại
            const leftBoundary = Math.max(0, currentPage - 2); // Trang bắt đầu của phần bên trái
            const rightBoundary = Math.min(totalPages - 1, currentPage + 2); // Trang kết thúc của phần bên phải

            // Thêm nút "Trang đầu tiên" nếu không ở trang đầu tiên
            if (currentPage > 0) {
                paginationItems.push(
                    <Pagination.First key={uuidv4()} onClick={() => onPageChange(0)} />
                );
            }

            // Thêm dấu "..." nếu trang đầu tiên không nằm trong danh sách hiển thị
            if (leftBoundary > 0) {
                paginationItems.push(ellipsis);
            }

            // Thêm các trang từ leftBoundary đến rightBoundary
            for (let i = leftBoundary; i <= rightBoundary; i++) {
                paginationItems.push(
                    <Pagination.Item
                        key={uuidv4()}
                        active={i === currentPage}
                        onClick={() => onPageChange(i)}
                    >
                        {i + 1}
                    </Pagination.Item>
                );
            }

            // Thêm dấu "..." nếu trang cuối cùng không nằm trong danh sách hiển thị
            if (rightBoundary < totalPages - 1) {
                paginationItems.push(ellipsis);
            }

            // Thêm nút "Trang cuối cùng" nếu không ở trang cuối cùng
            if (currentPage < totalPages - 1) {
                paginationItems.push(
                    <Pagination.Last key={uuidv4()} onClick={() => onPageChange(totalPages - 1)} />
                );
            }
        }

        return paginationItems;
    };

    return (
        <Row>
            <Col md={12} className="d-flex justify-content-center">
                <Pagination className="pagination">
                    {createPaginationItems()}
                </Pagination>
            </Col>
        </Row>
    );
};
