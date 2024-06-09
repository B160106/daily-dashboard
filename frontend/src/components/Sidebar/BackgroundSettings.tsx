import React, { useState, useEffect, useRef } from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../store/StoreProvider';
import { StyledColorPicker, StyledSaveColorButton } from '../../styled-components/Sidebar/ColorPickerStyles';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ClearIcon from '@mui/icons-material/Clear';
import axios from 'axios';
import {
  BackgroundSettingsContainer, RadioButtonContainer, ColorBoxContainer, ColorBox, StyledUnsplashInput, SaveButton, RefreshButton, CustomColorBox, RowContainer, RowLabel, AddIconWrapper, ColorSelectionDiv, DeleteIconWrapper
} from '../../styled-components/Sidebar/BackgroundSettings';
import RefreshIcon from '@mui/icons-material/Refresh';
import { presetColors, handleClickOutside } from '../../utils/sidebarFunctions';

const BackgroundSettings: React.FC = observer(() => {
  const { backgroundStore } = useStore();
  const [selectedBackground, setSelectedBackground] = useState<string>(backgroundStore.type);
  const [solidValue, setSolidValue] = useState<string>(backgroundStore.type === 'solid' ? backgroundStore.value : '#000000');
  const [unsplashValue, setUnsplashValue] = useState<string>(backgroundStore.type === 'custom' ? backgroundStore.value : '');
  const [isUnsplashValueChanged, setIsUnsplashValueChanged] = useState<boolean>(false);
  const [isColorPickerOpen, setIsColorPickerOpen] = useState<boolean>(false);
  const [customColor, setCustomColor] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);
  const colorPickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSelectedBackground(backgroundStore.type);
    if (backgroundStore.type === 'solid') {
      setSolidValue(backgroundStore.value);
    } else if (backgroundStore.type === 'custom') {
      setUnsplashValue(backgroundStore.value);
    }
  }, [backgroundStore.type, backgroundStore.value]);

  useEffect(() => {
    document.addEventListener('mousedown', (event) => handleClickOutside(event, colorPickerRef, inputRef, setIsColorPickerOpen));
    return () => {
      document.removeEventListener('mousedown', (event) => handleClickOutside(event, colorPickerRef, inputRef, setIsColorPickerOpen));
    };
  }, []);

  const handleDeleteCustomColor = async (color: string, event: React.MouseEvent) => {
    event.stopPropagation(); // Stop the event from propagating to the parent element
    const updatedCustomColors = backgroundStore.customBackgroundColors.filter(c => c !== color);
    backgroundStore.setCustomBackgroundColors(updatedCustomColors);

    try {
      await axios.put(`${process.env.REACT_APP_BACKEND_URL}/userprofile/custombackgroundcolors`, {
        customBackgroundColors: updatedCustomColors
      });
      console.log('Custom background colors updated:', updatedCustomColors);
    } catch (error) {
      console.error('Error updating custom background colors:', error);
    }
  };

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSelectedBackground(value);
    backgroundStore.setType(value as 'custom' | 'solid');
  };

  const handleSolidColorBoxClick = (color: string) => {
    setSolidValue(color);
    backgroundStore.setType('solid');
    backgroundStore.setValue(color);

    axios.put(`${process.env.REACT_APP_BACKEND_URL}/userprofile/background`, {
      type: 'solid',
      value: color
    }).then(response => {
      console.log('Background preference updated:', response.data);
    }).catch(error => {
      console.error('Error updating background preference:', error);
    });
  };

  const handleUnsplashInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUnsplashValue(event.target.value);
    setIsUnsplashValueChanged(event.target.value !== backgroundStore.value);
  };

  const handleUnsplashInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      backgroundStore.setType('custom');
      backgroundStore.setValue(unsplashValue);
      setIsUnsplashValueChanged(false);

      axios.put(`${process.env.REACT_APP_BACKEND_URL}/userprofile/background`, {
        type: 'custom',
        value: unsplashValue
      }).then(response => {
        console.log('Background preference updated:', response.data);
      }).catch(error => {
        console.error('Error updating background preference:', error);
      });
    } else if (event.key === 'Escape') {
      setUnsplashValue(backgroundStore.value);
      setIsUnsplashValueChanged(false);
    }
  };

  const handleSaveButtonClick = () => {
    backgroundStore.setType('custom');
    backgroundStore.setValue(unsplashValue);
    setIsUnsplashValueChanged(false);

    axios.put(`${process.env.REACT_APP_BACKEND_URL}/userprofile/background`, {
      type: 'custom',
      value: unsplashValue
    }).then(response => {
      console.log('Background preference updated:', response.data);
    }).catch(error => {
      console.error('Error updating background preference:', error);
    });
  };

  const handleRefreshButtonClick = () => {
    backgroundStore.setRefreshTriggerWrapper((prev: number) => prev + 1);
    console.log('Background refreshed with value:', unsplashValue);
  };

  const handleSaveCustomColor = () => {
    const updatedCustomColors = [...backgroundStore.customBackgroundColors, customColor];
    backgroundStore.setCustomBackgroundColors(updatedCustomColors);
    setIsColorPickerOpen(false);

    axios.put(`${process.env.REACT_APP_BACKEND_URL}/userprofile/custombackgroundcolors`, {
      customBackgroundColors: updatedCustomColors
    }).then(response => {
      console.log('Custom background colors updated:', response.data);
    }).catch(error => {
      console.error('Error updating custom background colors:', error);
    });
  };

  const handleColorChange = (color: any) => {
    setCustomColor(color.hex);
    backgroundStore.setType('solid');
    backgroundStore.setValue(color.hex);

    axios.put(`${process.env.REACT_APP_BACKEND_URL}/userprofile/background`, {
      type: 'solid',
      value: color.hex
    }).then(response => {
      console.log('Background preference updated:', response.data);
    }).catch(error => {
      console.error('Error updating background preference:', error);
    });
  };

  return (
    <BackgroundSettingsContainer>
      <h3>Background</h3>
      <RadioButtonContainer>
        <label>
          <input
            type="radio"
            name="background"
            value="solid"
            checked={selectedBackground === 'solid'}
            onChange={handleRadioChange}
          />
          Solid
        </label>
        <label>
          <input
            type="radio"
            name="background"
            value="custom"
            checked={selectedBackground === 'custom'}
            onChange={handleRadioChange}
          />
          Unsplash
        </label>
      </RadioButtonContainer>
      {selectedBackground === 'solid' ? (
        <ColorSelectionDiv>
          <RowContainer>
            <RowLabel>Presets</RowLabel>
            <ColorBoxContainer>
              {Object.values(presetColors).map((color, index) => (
                <ColorBox 
                  key={index}
                  color={color}
                  isSelected={solidValue === color}
                  onClick={() => handleSolidColorBoxClick(color)}
                />
              ))}
            </ColorBoxContainer>
          </RowContainer>
          <RowContainer>
            <RowLabel>Custom</RowLabel>
            <ColorBoxContainer>
              {backgroundStore.customBackgroundColors.map((color, index) => (
                <CustomColorBox 
                  key={index}
                  color={color}
                  isSelected={solidValue === color}
                  onClick={() => handleSolidColorBoxClick(color)}
                >
                  <DeleteIconWrapper onClick={(event) => handleDeleteCustomColor(color, event)}>
                    <ClearIcon />
                  </DeleteIconWrapper>
                </CustomColorBox>
              ))}
              <AddIconWrapper>
                <AddCircleOutlineIcon onClick={() => setIsColorPickerOpen(!isColorPickerOpen)} />
              </AddIconWrapper>
            </ColorBoxContainer>
          </RowContainer>
        </ColorSelectionDiv>
      ) : (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <StyledUnsplashInput 
            ref={inputRef}
            type="text" 
            placeholder="Enter search query" 
            value={unsplashValue} 
            onChange={handleUnsplashInputChange} 
            onKeyDown={handleUnsplashInputKeyDown}
          />
          {isUnsplashValueChanged ? (
            <SaveButton onClick={handleSaveButtonClick} />
          ) : unsplashValue && (
            <RefreshButton as={RefreshIcon} onClick={handleRefreshButtonClick} />
          )}
        </div>
      )}
      {isColorPickerOpen && (
        <div ref={colorPickerRef}>
          <StyledColorPicker
            color={customColor}
            onChangeComplete={handleColorChange}
          />
          <StyledSaveColorButton onClick={handleSaveCustomColor}>Save Color</StyledSaveColorButton>
        </div>
      )}
    </BackgroundSettingsContainer>
  );
});

export default BackgroundSettings;
