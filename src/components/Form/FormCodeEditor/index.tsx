import React from 'react';
import { wrapLabelAndError } from '../_wrapForm';
import styled from 'styled-components';
import { ISharedFormInput } from '../_types';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';

import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';

interface IFormCodeEditor extends ISharedFormInput {
  language: 'javascript' | 'json';
}

export const FormCodeEditor: React.FC<IFormCodeEditor> = (
  formInput
): JSX.Element => {
  const {
    input: { onFocus, onBlur, ...inputProps },
  } = formInput;
  return wrapLabelAndError(
    <StyledWrapper>
      <Editor
        {...inputProps}
        onValueChange={inputProps.onChange}
        highlight={code => highlight(code, languages[formInput.language])}
        padding={4}
        style={{
          fontFamily: '"Fira code", "Fira Mono", monospace',
          fontSize: 11,
        }}
      />
    </StyledWrapper>,
    formInput
  );
};

const StyledWrapper = styled.div`
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 0.25rem;

  &:focus {
    border-color: rgba(23, 97, 253, 0.5);
    outline: 0;
  }

  pre {
    min-height: 50px;
  }

  .token.cdata,
  .token.comment,
  .token.doctype,
  .token.prolog {
    color: #90a4ae;
  }

  .token.punctuation {
    color: #9e9e9e;
  }

  .namespace {
    opacity: 0.7;
  }

  .token.boolean,
  .token.constant,
  .token.deleted,
  .token.number,
  .token.property,
  .token.symbol,
  .token.tag {
    color: #e91e63;
  }

  .token.attr-name,
  .token.builtin,
  .token.char,
  .token.inserted,
  .token.selector,
  .token.string {
    color: #4caf50;
  }

  .language-css .token.string,
  .style .token.string,
  .token.entity,
  .token.operator,
  .token.url {
    color: #795548;
  }

  .token.atrule,
  .token.attr-value,
  .token.keyword {
    color: #3f51b5;
  }

  .token.function {
    color: #f44336;
  }

  .token.important,
  .token.regex,
  .token.variable {
    color: #ff9800;
  }

  .token.bold,
  .token.important {
    font-weight: 700;
  }

  .token.italic {
    font-style: italic;
  }

  .token.entity {
    cursor: help;
  }
`;
