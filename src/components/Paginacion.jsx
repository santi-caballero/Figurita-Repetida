import React from "react";
import { Link } from "react-router-dom";
import { Pagination } from "@mui/material";
import { Stack } from "@mui/system";

const Paginacion = ({ postsPerPage, totalPosts, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="ull">
        {pageNumbers.map((number) => (
          <li key={number} className="pagination">
            <Link className="link" onClick={() => paginate(number)}>
              {number}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Paginacion;
