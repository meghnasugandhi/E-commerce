// src/components/ThreeColumnBanners.jsx
import { Container, Row, Col } from 'react-bootstrap';
import CategorySidebar from './CategorySidebar';
import CategorySidebar2 from './CategorySidebar2.jsx';
import Cor from './main.jsx';
import S1 from './s1.jsx';
import S2 from './s2.jsx';
import BannerComponent from './banner.jsx';

const ThreeColumnBanners = () => {
    return (
        // 1. Ensure the Container is fluid and has margins
        <Container fluid className="my-5">
            {/* 2. KEY CHANGE: Add d-flex and align-items-stretch to the Row. 
                * d-flex: Enables flexbox context for the Row.
                * align-items-stretch (default): This is what makes the Cols equal height. */}
            <Row className="d-flex align-items-stretch"> 
                
                {/* 1. LEFT COLUMN: Sidebar */}
                {/* KEY CHANGE: Add h-100 to ensure content respects the column height if needed */}
                <Col lg={2} md={4} className="h-100"> 
                    <CategorySidebar2 /> 
                </Col>

                {/* 2. CENTER COLUMN: Main Banner */}
                {/* KEY CHANGE: Add h-100 to ensure content respects the column height if needed */}
                <Col lg={7} md={8} className="h-100"> 
                    <Cor /> 
                </Col>

                {/* 3. RIGHT COLUMN: Two Stacked Banners */}
                <Col lg={3} md={12}> 
                    {/* 🚀 KEY CHANGE 3: Add d-flex flex-column h-100 to the BannerComponent's container.
                        * d-flex flex-column: Makes the BannerComponent's children (the two banners) stack vertically 
                            and allows them to manage height like flex items.
                        * h-100: Ensures this column's content (the BannerComponent) takes up 100% of the Col's height. */}
                    <div className="d-flex flex-column h-100"> 
                         {/* NOTE: If BannerComponent already renders the two right banners,
                             you may need to adjust the CSS *inside* BannerComponent to ensure its 
                             children are spaced/sized correctly to fill the height.
                             Often, this means the banners inside BannerComponent should use 
                             className="flex-grow-1" or similar to share the vertical space. */}
                        <BannerComponent/>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};
export default ThreeColumnBanners;