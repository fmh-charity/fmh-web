import React, { useEffect, useState } from "react";
import { useGetNewsQuery } from "src/services/api/newsApi";
import ReactPaginate from "react-paginate";
import { useGetClaimsQuery } from "src/services/api/claimsApi";
import { useGetWishesQuery } from "src/services/api/wishesApi";
import ClaimsNode from "src/pages/claims/components/claimNode/ClaimNode";
import WishesNode from "src/pages/wishes/components/wishesNode/WishesNode";
import NewsNode from "src/pages/news/components/newsNode/NewsNode";
import style from "./PaginateItem.module.less";

interface IUseQuery {
  CardNode: typeof ClaimsNode | typeof WishesNode | typeof NewsNode;
  useQuery:
    | typeof useGetNewsQuery
    | typeof useGetClaimsQuery
    | typeof useGetWishesQuery;
}

const PaginateComponent: React.FC<IUseQuery> = ({ useQuery, CardNode }) => {
  const { data } = useQuery();
  const [currentItems, setCurrentItems] = useState<any>([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 10;

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    if (data) {
      setCurrentItems(data.slice(itemOffset, endOffset));
      setPageCount(Math.ceil(data.length / itemsPerPage));
    }
  }, [itemOffset, data]);

  const handlePageClick = (event: any) => {
    if (!data) {
      return;
    }
    setItemOffset((event.selected * itemsPerPage) % data.length);
  };

  return (
    <div className={style.paginator_comp__wrapper}>
      <div className={style.paginator_comp__container}>
        <div className={style.paginator_comp__body_wrapper}>
          <div className={style.paginator_comp__body}>
            {currentItems && <CardNode data={currentItems} />}
          </div>
        </div>
      </div>
      <ReactPaginate
        breakLabel="..."
        nextLabel="Вперёд >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={2}
        pageCount={pageCount}
        previousLabel="< Назад"
        className={style.paginator_comp__switcher}
      />
    </div>
  );
};

export default PaginateComponent;
