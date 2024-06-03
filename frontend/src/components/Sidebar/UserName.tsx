import React, { useState, useEffect, useRef } from 'react';
import { InputContainer, StyledUserName, StyledUsernameEditIcon, HiddenTextSpan, StyledCheckIcon, StyledClearIcon } from '../../styled-components/Sidebar/UserName';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';

const UserName: React.FC = () => {
  const [username, setUsername] = useState<string>('Stranger');
  const [tempUsername, setTempUsername] = useState<string>(username);
  const [inputWidth, setInputWidth] = useState<number>(0);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const textSpanRef = useRef<HTMLSpanElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (textSpanRef.current) {
      setInputWidth(textSpanRef.current.offsetWidth);
    }
  }, [tempUsername]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTempUsername(event.target.value);
  };

  const handleEditClick = () => {
    setTempUsername(username);
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setUsername(tempUsername);
    setIsEditing(false);
  };

  const handleClearClick = () => {
    setTempUsername(username);
    setIsEditing(false);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      setUsername(tempUsername);
      setIsEditing(false);
    }
  };

  const handleDoubleClick = () => {
    setTempUsername(username);
    setIsEditing(true);
  };

  return (
    <InputContainer>
      <StyledUserName
        type="text"
        value={tempUsername}
        onChange={handleUsernameChange}
        onKeyPress={handleKeyPress}
        onDoubleClick={handleDoubleClick}
        placeholder="Stranger"
        width={inputWidth}
        isEditing={isEditing}
        readOnly={!isEditing}
        ref={inputRef}
      />
      {isEditing ? (
        <>
          <StyledCheckIcon as={CheckIcon} onClick={handleSaveClick} />
          <StyledClearIcon as={ClearIcon} onClick={handleClearClick} />
        </>
      ) : (
        <StyledUsernameEditIcon className='edit-icon' onClick={handleEditClick} />
      )}
      <HiddenTextSpan ref={textSpanRef}>{tempUsername || 'Stranger'}</HiddenTextSpan>
    </InputContainer>
  );
};

export default UserName;