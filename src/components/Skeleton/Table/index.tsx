import React from "react";
import styled from "styled-components";
import SkeletonLoader from "tiny-skeleton-loader-react";
import { Stack } from "../../../ui-blocks/Stack";
import { sharedSkeletonProps } from "../constants";

const count = 10;

const columnCount = 5;

const Root = styled.div`
  padding: 8px;
`;

export function TableSkeleton() {
  return (
    <Root>
      {Array.from({ length: count }, (_, k) => k + 1).map((key, index) => (
        <div key={key}>
          {index > 0 && (
            <SkeletonLoader
              background={sharedSkeletonProps.background}
              height="1px"
              radius="3px"
              style={{ margin: "4px 0" }}
            />
          )}
          <Stack>
            {Array.from({ length: columnCount }, (_, k) => k + 1).map(
              (key$1) => (
                <SkeletonLoader
                  key={key$1}
                  background={sharedSkeletonProps.background}
                  height="30px"
                  style={{ margin: "8px 0", flex: key$1 % 3 ? 2 : 1 }}
                />
              )
            )}
            <Stack style={{ flexBasis: 70, margin: "8px 0" }}>
              <SkeletonLoader
                background={sharedSkeletonProps.background}
                height="30px"
                circle
              />
              <SkeletonLoader
                background={sharedSkeletonProps.background}
                height="30px"
                circle
              />
            </Stack>
          </Stack>
        </div>
      ))}
    </Root>
  );
}