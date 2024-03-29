import React from "react";
import styled from "styled-components";
import "./index.css"

const Ul = styled.ul`
  display: flex;
  background-color: white;
  justify-content: right;
  padding: 0 0.2rem;
  border: 0.2rem inset black;
  width: 100%;
`;

export const DigitNumberGroup = React.memo(({ value: num }: { value: number }) => {

  const numStrArr = num.toString().split('');
  const classNames = 'zero one two three four five six seven eight nine'.split(' ');

  return (
    <Ul>
      {numStrArr.map((str, i) =>
        <div key={`${str}-${i}`} className="light">
          <div className="digits">
            <div className={classNames[Number(str)]}>
              <span className="d1"></span>
              <span className="d2"></span>
              <span className="d3"></span>
              <span className="d4"></span>
              <span className="d5"></span>
              <span className="d6"></span>
              <span className="d7"></span>
            </div>
          </div>
        </div>
      )}
    </Ul>
  )
})