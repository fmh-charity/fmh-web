import React, { useEffect, useState } from "react";
import { useGetNewsQuery } from "src/services/api/newsApi";
import ReactPaginate from "react-paginate";
import { useGetClaimsQuery } from "src/services/api/claimsApi";
import { useGetWishesQuery } from "src/services/api/wishesApi";
import ClaimsNode from "src/pages/claims/components/claimNode/ClaimNode";
import WishesNode from "src/pages/wishes/components/wishesNode/WishesNode";
import NewsNode from "src/pages/news/components/newsNode/NewsNode";
import style from "./PaginateItem.module.less";
import Loader from "../loader/Loader";

interface IUseQuery {
  CardNode: typeof ClaimsNode | typeof WishesNode | typeof NewsNode;
  useQuery:
    | typeof useGetNewsQuery
    | typeof useGetClaimsQuery
    | typeof useGetWishesQuery;
}

const PaginateComponent: React.FC<IUseQuery> = ({ useQuery, CardNode }) => {
  const [currentItems, setCurrentItems] = useState<any>([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const [currentPage, setCurrentPage] = useState(0);
  const { data, isLoading } = useQuery({
    pages: currentPage,
    elements: itemsPerPage,
    status: "OPEN",
    publishDate: false,
  });

  useEffect(() => {
    if (localStorage.getItem("itemsPerPage")) {
      setItemsPerPage(
        parseInt(localStorage.getItem("itemsPerPage") || "4", 10)
      );
    }

    if (data) {
      setCurrentItems(data.elements);
      setPageCount(data.pages);
    }
  }, [data]);

  const handlePageClick = (event: any) => {
    if (!data) {
      return;
    }
    setCurrentPage(event.selected);
  };

  function changeItemsPerPage(event: any) {
    const perPage = event.target.value;
    setItemsPerPage(parseInt(perPage, 10));
    setCurrentPage(0);
    localStorage.setItem("itemsPerPage", perPage);
  }

  if (isLoading)
    return (
      <div className={style.paginator_comp__loader}>
        <Loader />
      </div>
    );
  return (
    <div className={style.paginator_comp__wrapper}>
      <div className={style.paginator_comp__container}>
        <div className={style.paginator_comp__body_wrapper}>
          <div className={style.paginator_comp__body}>
            {currentItems && <CardNode data={currentItems} />}
          </div>
        </div>
      </div>
      <div className={style.paginator_comp__with_selector}>
        <ReactPaginate
          breakLabel="..."
          nextLabel="Вперёд >"
          onPageChange={handlePageClick}
          pageCount={pageCount}
          previousLabel="< Назад"
          className={style.paginator_comp__switcher}
          activeClassName={style.selected}
          forcePage={currentPage}
        />
        <select
          className={style.paginator_comp__select}
          value={itemsPerPage}
          onChange={changeItemsPerPage}
        >
          <option defaultValue="4">4</option>
          <option value="6">6</option>
          <option value="8">8</option>
          <option value="12">12</option>
          <option value="20">20</option>
          <option value="40">40</option>
        </select>
      </div>
    </div>
  );
};

export default PaginateComponent;
