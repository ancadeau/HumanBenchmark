"use client";

import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  getKeyValue,
} from "@nextui-org/react";

const rows = [
  {
    key: "1",
    player: "Tony Reichert",
    rank: "1",
    agerange: "18-20",
    score: "100",
  },
  {
    key: "2",
    player: "Zoey Lang",
    rank: "2",
    agerange: "18-20",
    score: "95",
  },
  {
    key: "3",
    player: "Jane Fisher",
    rank: "3",
    agerange: "27+",
    score: "90",
  },
  {
    key: "4",
    player: "William Howard",
    rank: "4",
    agerange: "20-24",
    score: "85",
  },
  {
    key: "5",
    player: "John Doe",
    rank: "5",
    agerange: "18-20",
    score: "80",
  },
  {
    key: "6",
    player: "Tony Reichert",
    rank: "6",
    agerange: "18-20",
    score: "75",
  },
  {
    key: "7",
    player: "Zoey Lang",
    rank: "7",
    agerange: "18-20",
    score: "70",
  },
  {
    key: "8",
    player: "Jane Fisher",
    rank: "8",
    agerange: "27+",
    score: "65",
  },
  {
    key: "9",
    player: "William Howard",
    rank: "9",
    agerange: "20-24",
    score: "60",
  },
  {
    key: "10",
    player: "John Doe",
    rank: "10",
    agerange: "18-20",
    score: "55",
  },
  {
    key: "11",
    player: "Tony Reichert",
    rank: "11",
    agerange: "18-20",
    score: "50",
  },
  {
    key: "12",
    player: "Zoey Lang",
    rank: "12",
    agerange: "18-20",
    score: "45",
  },
  {
    key: "13",
    player: "Jane Fisher",
    rank: "13",
    agerange: "27+",
    score: "40",
  },
  {
    key: "14",
    player: "William Howard",
    rank: "14",
    agerange: "20-24",
    score: "35",
  },
  {
    key: "15",
    player: "John Doe",
    rank: "15",
    agerange: "18-20",
    score: "30",
  },
  {
    key: "16",
    player: "Tony Reichert",
    rank: "16",
    agerange: "18-20",
    score: "25",
  },
  {
    key: "17",
    player: "Zoey Lang",
    rank: "17",
    agerange: "18-20",
    score: "20",
  },
  {
    key: "18",
    player: "Jane Fisher",
    rank: "18",
    agerange: "27+",
    score: "15",
  },
  {
    key: "19",
    player: "William Howard",
    rank: "19",
    agerange: "20-24",
    score: "10",
  },
  {
    key: "20",
    player: "John Doe",
    rank: "20",
    agerange: "18-20",
    score: "5",
  },
];

const columns = [
  {
    key: "rank",
    label: "RANK",
  },
  {
    key: "player",
    label: "PLAYER",
  },
  {
    key: "agerange",
    label: "AGE RANGE",
  },
  {
    key: "score",
    label: "SCORE",
  },
];

const LeaderBoard = () => {
  const [page, setPage] = React.useState(1);
  const rowsPerPage = 4;

  const pages = Math.ceil(rows.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return rows.slice(start, end);
  }, [page, rows]);

  return (
    <div className="scroll-container bg-blue-500 justify-center items-center flex">
      <div className="flex h-full w-3/4 justify-center items-center section ">
        <Table
          aria-label="Example table with client side pagination"
          bottomContent={
            <div className="flex w-full justify-center">
              <Pagination
                isCompact
                showControls
                showShadow
                color="primary"
                page={page}
                total={pages}
                onChange={(page) => setPage(page)}
              />
            </div>
          }
          classNames={{
            wrapper: "min-h-[222px]",
          }}
        >
          <TableHeader>
            <TableColumn key="rank">RANK</TableColumn>
            <TableColumn key="player">PLAYER</TableColumn>
            <TableColumn key="agerange">AGE RANGE</TableColumn>
            <TableColumn key="score">SCORE</TableColumn>
          </TableHeader>
          <TableBody items={items}>
            {(item) => (
              <TableRow key={item.rank}>
                {(columnKey) => (
                  <TableCell>{getKeyValue(item, columnKey)}</TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default LeaderBoard;