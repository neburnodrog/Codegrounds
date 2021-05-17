import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { CodeGroundDocument } from '../../../src/models/CodeGround';
import { CodeEditor } from '../Components/CodeGround/CodeEditor';
import CodeGroundTitle from '../Components/CodeGround/CodeGroundTitle';
const CodeGroundWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 92vh;
  flex-grow: 1;
`;

const EditorsWrapper = styled.div`
  display: flex;
  justify-content: center;
  /* flex-flow: column; */
  width: 100%;
  max-height: 29vh;
  flex: 0 0 0;
`;

const IframeWrapper = styled.div`
  flex: 2 0 0;
  width: 100%;
  background-color: white;
  display: flex;
  flex-direction: column;
`;

export interface CodeGroundProps {
  codeGround?: CodeGroundDocument;
}

export default function CodeGround(props: CodeGroundProps) {
  const codeGround = props.codeGround;
  const [title, setTitle] = useState(
    codeGround ? codeGround.title : 'untitled',
  );
  const [html, setHtml] = useState(codeGround ? codeGround.html : '');
  const [css, setCss] = useState(codeGround ? codeGround.css : '');
  const [js, setJs] = useState(codeGround ? codeGround.js : '');
  const [srcDoc, setSrcDoc] = useState('');

  const defaultCss = '<style>body{margin:0}</style>';

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(`
      <html>
        <head>
          ${defaultCss}
          <style>${css}</style>
        </head>
        <body>${html}</body>
        <script>${js}</script>
      </html>
      `);
    }, 500);

    return () => clearTimeout(timeout);
  }, [html, css, js]);

  return (
    <>
      <CodeGroundWrapper>
        <CodeGroundTitle title={title} setTitle={setTitle} />
        <EditorsWrapper>
          <CodeEditor
            displayName="HTML"
            language="xml"
            value={html}
            onChange={setHtml}
          />
          <CodeEditor
            displayName="CSS"
            language="css"
            value={css}
            onChange={setCss}
          />
          <CodeEditor
            displayName="JS"
            language="javascript"
            value={js}
            onChange={setJs}
          />
        </EditorsWrapper>
        <IframeWrapper>
          <iframe
            srcDoc={srcDoc}
            title="rendered-ground"
            frameBorder="0"
            sandbox="allow-scripts"
            width="100%"
            height="100%"
            style={{ flex: '1 0 0' }}
          ></iframe>
        </IframeWrapper>
      </CodeGroundWrapper>
    </>
  );
}