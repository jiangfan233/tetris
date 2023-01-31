import styled from "styled-components"
import React from "react"



const Div = styled.div`
  padding: 1rem;
  min-width: 20rem;
  border-radius: 1rem;
  background-color: #161515;
`

const P = styled.p`
  font-size: 1.5rem;
  width: 100%;
  text-align: center;
  margin-top: 1.5rem;
  font-family: cursive;

  /* 可能存在兼容性问题 */
  background-image: -webkit-linear-gradient(bottom right, red, #fd8403, yellow); 
  -webkit-background-clip: text; 
  -webkit-text-fill-color: transparent; 
  background-clip: text;
  
`

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

const Col = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

export const Decorator = ({ children: BlockContainer }: { children: React.ReactNode }) => {
  return <Div>
    <Row>
      {BlockContainer}

    </Row>
    <Row>
      <P>Just like the old good days~</P>
    </Row>
  </Div>
}