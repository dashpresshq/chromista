import React, { Fragment, useEffect } from 'react';
import { useTable, usePagination, useSortBy, useFilters } from 'react-table';
import ReactPaginate from 'react-paginate';
import classnames from 'classnames';
import { ComponentIsLoading } from '../ComponentIsLoading';
import { ErrorAlert } from '../Alert';
import { SimpleSelect } from '../Form';
import { EmptyWrapper } from '../EmptyWrapper';
import {
  IFetchTableDataParams,
  ITableFilter,
  ITableProps,
} from './Table.types';
import { SoftButton } from '../Button/SoftButton';
import * as StyledGrid from 'styled-bootstrap-grid';
import styled from 'styled-components';
import { DEFAULT_TABLE_PARAMS } from './constants';
import { PaginatedData } from '@gothicgeeks/shared';
import { UseQueryResult } from 'react-query';
import { Spacer, Stack, Text } from '../../ui-blocks';

export type IProps = Omit<ITableProps, 'url'> & {
  tableData: Pick<
    UseQueryResult<PaginatedData<Record<string, unknown>>, unknown>,
    'data' | 'isLoading' | 'error' | 'isPreviousData'
  >;
  fetchTableDataParams: IFetchTableDataParams;
  setFetchTableDataParams: (params: IFetchTableDataParams) => void;
};

export const Presentation: React.FC<IProps> = ({
  fetchTableDataParams,
  tableData,
  setFetchTableDataParams,
  title,
  columns,
  createPath,
  singular,
}) => {
  const {
    data = { data: [], pageIndex: 0, pageSize: 10, totalRecords: 0 },
    isLoading,
    error,
    isPreviousData,
  } = tableData;
  const totalPageCount =
    data.totalRecords === 0
      ? 0
      : Math.ceil(data.totalRecords / fetchTableDataParams.pageSize);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    gotoPage,
    setPageSize,
    state: tableState,
  } = useTable(
    {
      columns,
      data: data.data,
      pageCount: totalPageCount,
      manualPagination: true,
      manualFilters: true,
      manualSortBy: true,
      disableMultiSort: true,
      autoResetSortBy: false,
      autoResetPage: false,
      autoResetFilters: false,
      initialState: DEFAULT_TABLE_PARAMS,
      defaultColumn: {
        Filter: <Fragment />,
      },
    },
    useFilters,
    useSortBy,
    usePagination
  );

  useEffect(() => {
    if (
      tableState.filters.length === 0 ||
      tableState.filters.some(({ value }: ITableFilter) => {
        if (typeof value === 'string' && value.length < 3) {
          // TODO clean the false posities when my select value is less than three characters
          // BY adding a new field to the parameter to check and filter out
          return false;
        }
        if (typeof value === 'object') {
          return !Object.values(value).some(value$1 => !value$1);
        }
        return true;
      })
    ) {
      setFetchTableDataParams(tableState);
    }
  }, [tableState]);

  return (
    <StyledGrid.Container fluid={true}>
      {error ? (
        <>
          <Spacer />
          <ErrorAlert message={error} />
          <Spacer />
        </>
      ) : null}
      <StyledTableResponsive>
        <Stack justify="space-between">
          <StyledTableTitle>{title}</StyledTableTitle>
          <StyledSoftButton
            to={createPath}
            label={`New ${singular}`}
            icon="add"
          />
        </Stack>
        <div style={{ position: 'relative' }}>
          {(isLoading || isPreviousData) && !error ? (
            <StyledOverlay>
              <StyledOverlayText>
                <ComponentIsLoading />
              </StyledOverlayText>
            </StyledOverlay>
          ) : null}
          <StyledTable {...getTableProps()}>
            <StyledTHead>
              {headerGroups.map((headerGroup: any, key2: number) => (
                <tr {...headerGroup.getHeaderGroupProps()} key={key2}>
                  {headerGroup.headers.map((column: any, key1: number) => {
                    return (
                      <StyledTh
                        {...column.getHeaderProps(
                          column.getSortByToggleProps()
                        )}
                        key={key1}
                      >
                        <Stack justify="space-between">
                          <Text weight="bold" as="span">
                            {column.render('Header')}
                          </Text>
                          {column.canSort && (
                            <StyledSorting
                              className={classnames({
                                desc: column.isSorted && column.isSortedDesc,
                                asc: column.isSorted && !column.isSortedDesc,
                              })}
                            />
                          )}
                          {column.canFilter ? column.render('Filter') : null}
                        </Stack>
                      </StyledTh>
                    );
                  })}
                </tr>
              ))}
            </StyledTHead>
            <tbody {...getTableBodyProps()}>
              {rows.map((row: any, key3: number) => {
                prepareRow(row);
                return (
                  <StyledBodyTR {...row.getRowProps()} key={key3}>
                    {row.cells.map((cell: any, key: number) => {
                      return (
                        <StyledTd {...cell.getCellProps()} key={key}>
                          {cell.render('Cell')}
                        </StyledTd>
                      );
                    })}
                  </StyledBodyTR>
                );
              })}
              {data.data.length === 0 ? (
                <StyledBodyTR>
                  <StyledTd colSpan={10000}>
                    {isLoading ? (
                      <div style={{ height: '204px' }} />
                    ) : (
                      <EmptyWrapper text="No Data" />
                    )}
                  </StyledTd>
                </StyledBodyTR>
              ) : null}
            </tbody>
          </StyledTable>
        </div>
        <Stack justify="space-between" align="center">
          <label>
            Showing{' '}
            <SimpleSelect
              options={[10, 25, 50].map(option => ({
                value: `${option}`,
                label: `${option}`,
              }))}
              onChange={value => setPageSize(Number(value))}
              value={tableState.pageSize}
            />{' '}
            entries of <b>{data.totalRecords}</b> results
          </label>
          <StyledPagination>
            <ReactPaginate
              previousLabel={'prev'}
              nextLabel={'next'}
              breakLabel={'...'}
              pageCount={totalPageCount}
              marginPagesDisplayed={2}
              pageRangeDisplayed={3}
              breakClassName={'page-item'}
              nextClassName={'page-item'}
              previousClassName={'page-item'}
              pageClassName={'page-item'}
              breakLinkClassName={'page-link'}
              pageLinkClassName={'page-link'}
              nextLinkClassName={'page-link'}
              previousLinkClassName={'page-link'}
              containerClassName={'pagination'}
              activeClassName={'active'}
              onPageChange={({ selected }) => {
                gotoPage(selected);
              }}
            />
          </StyledPagination>
        </Stack>
      </StyledTableResponsive>
    </StyledGrid.Container>
  );
};

const StyledBodyTR = styled.tr`
  padding: 4px;
  border-top: 2px solid #eaf0f7;
  page-break-inside: avoid;
  &:hover {
    color: #303e67;
    background-color: #f8f8fc;
  }
`;

const StyledSorting = styled.span`
  cursor: pointer;

  &:before {
    left: 0.8em;
    content: '\\2191';
  }

  &:after {
    left: 0.3em;
    content: '\\2193';
  }

  &:after,
  &:before {
    color: rgb(48, 62, 103);
    opacity: 0.3;
  }

  &.desc:after,
  &.asc:before {
    color: #1761fd;
    opacity: 1;
  }
`;

const StyledTHead = styled.thead`
  background-color: #f1f5fa;
`;

const StyledPagination = styled.div`
  .pagination {
    display: flex;
    padding-left: 0;
    list-style: none;
  }

  .page-link {
    padding: 0.25rem 0.5rem;
    font-size: 0.71rem;
    line-height: 1.8;
    color: #1761fd;
  }

  .page-item.active {
    .page-link {
      z-index: 3;
      background-color: #1761fd;
      border-color: #1761fd;
    }
  }

  .page-item.disabled {
    .page-link {
      color: #b6c2e4;
      border-color: #eaf0f9;
    }
  }
`;

const StyledTableResponsive = styled.div`
  display: block;
  width: 100%;
  border: 0;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  background: ${props => props.theme.colors.white};
  padding: 0.5rem;
`;

const StyledTh = styled.th`
  padding: 0.45rem;
  vertical-align: middle;
  border: 1px solid #eaf0f7;
  border-bottom-width: 2px;
  color: ${props => props.theme.text.main};
  font-weight: 500;
  border-top: none;
`;

const StyledTd = styled.td`
  padding: 0.45rem;
  border: 1px solid #eaf0f9;
  border: 1px solid #eaf0f7;
  vertical-align: middle;
  font-weight: 400;
  border-top: 1px solid #eaf0f7;
`;

const StyledTableTitle = styled.h4`
  line-height: 1.8em;
  margin: 0;
`;

const StyledTable = styled.table`
  width: 100%;
  margin-bottom: 1rem;
  color: ${props => props.theme.text.main};
  border-collapse: collapse;
  border: 1px solid #eaf0f7;
  .dropdown-toggle::after {
    display: none;
  }
`;

const StyledOverlay = styled.div`
  position: absolute;
  display: block;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.6);
  z-index: 4;
  cursor: pointer;
`;

const StyledOverlayText = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  font-size: 50px;
  color: white;
  transform: translate(-50%, -50%);
`;

const StyledSoftButton = styled(SoftButton)`
  margin-bottom: 0.5rem;
  float: right;
`;