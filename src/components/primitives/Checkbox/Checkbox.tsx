import React, { useContext } from 'react';
import { default as Pressable, IPressableProps } from '../Pressable';
import { mergeRefs } from './../../../utils';
import { useThemeProps } from '../../../hooks';
import { Center } from '../../composites/Center';
import { useFormControlContext } from '../../composites/FormControl';
import Box from '../Box';
import Icon from '../Icon';
import type { ICheckboxProps } from './types';
import { useToggleState } from '@react-stately/toggle';
import { CheckboxGroupContext } from './CheckboxGroup';
import { useCheckbox, useCheckboxGroupItem } from '@react-native-aria/checkbox';

const Checkbox = ({ icon, children, ...props }: ICheckboxProps, ref: any) => {
  const formControlContext = useFormControlContext();

  const checkboxGroupContext = React.useContext(CheckboxGroupContext);
  const {
    _interactionBox: { _pressed: _iterationBoxPressed, ..._interactionBox },
    _checkbox: {
      _checked: _checboxChecked,
      _disabled: _checkboxDisabled,
      _invalid: _checkboxInvalid,
      ..._checkbox
    },
    _icon,
    isInvalid,
    size,
    ...newProps
  } = useThemeProps('Checkbox', {
    ...checkboxGroupContext,
    ...formControlContext,
    ...props,
  });
  const _ref = React.useRef();
  const mergedRef = mergeRefs([ref, _ref]);
  const state = useToggleState({
    ...props,
    defaultSelected: props.defaultIsChecked,
    isSelected: props.isChecked,
  });
  const groupState = useContext(CheckboxGroupContext);

  // Swap hooks depending on whether this checkbox is inside a CheckboxGroup.
  // This is a bit unorthodox. Typically, hooks cannot be called in a conditional,
  // but since the checkbox won't move in and out of a group, it should be safe.
  const { inputProps } = groupState
    ? // eslint-disable-next-line react-hooks/rules-of-hooks
      useCheckboxGroupItem(
        {
          ...newProps,
          value: newProps.value,
        },
        groupState.state,
        //@ts-ignore
        mergedRef
      )
    : // eslint-disable-next-line react-hooks/rules-of-hooks
      useCheckbox(
        newProps,
        state,
        //@ts-ignore
        mergedRef
      );

  const isChecked = inputProps.checked;
  const isDisabled = inputProps.disabled;

  const sizedIcon = icon
    ? () =>
        React.cloneElement(
          icon,
          {
            size,
            ..._icon,
          },
          icon.props.children
        )
    : null;
  const nativeComponent = (
    <Pressable
      {...(inputProps as IPressableProps)}
      accessibilityRole="checkbox"
    >
      {({ isPressed }: any) => {
        return (
          <Center
            flexDirection="row"
            justifyContent="center "
            alignItems="center"
            borderRadius="full"
            ref={_ref}
            {...newProps}
          >
            <Center>
              {/* Interaction Wrapper */}
              <Box
                {..._interactionBox}
                {...(isPressed && _iterationBoxPressed)}
                p={5}
                w="100%"
                height="100%"
                zIndex={-1}
              />
              {/* Checkbox */}
              <Center
                {..._checkbox}
                {...(isChecked && _checboxChecked)}
                {...(isDisabled && _checkboxDisabled)}
                {...(isInvalid && _checkboxInvalid)}
              >
                {icon && sizedIcon && isChecked ? (
                  sizedIcon()
                ) : (
                  <Icon
                    name="check"
                    size={size}
                    {..._icon}
                    opacity={isChecked ? 1 : 0}
                  />
                )}
              </Center>
            </Center>
            {/* Label */}
            {children}
          </Center>
        );
      }}
    </Pressable>
  );

  return nativeComponent;
};

export default React.memo(React.forwardRef(Checkbox));
