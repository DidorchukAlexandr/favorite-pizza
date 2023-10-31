import React from "react";
import ContentLoader from "react-content-loader";

export const Skeleton = () => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={280}
    height={500}
    viewBox="0 0 280 500"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
   
  >
    <circle cx="143" cy="151" r="125" />
    <rect x="15" y="294" rx="0" ry="0" width="250" height="25" />
    <rect x="14" y="332" rx="11" ry="11" width="249" height="72" />
    <rect x="165" y="367" rx="0" ry="0" width="1" height="0" />
    <rect x="175" y="421" rx="22" ry="22" width="87" height="38" />
    <rect x="22" y="425" rx="9" ry="9" width="141" height="30" />
  </ContentLoader>
);

