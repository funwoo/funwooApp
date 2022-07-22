import React, {
  PropsWithChildren,
  ReactElement,
  ValidationMap,
  WeakValidationMap,
} from 'react';
import {
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
} from 'react-native';
import classNames from 'classnames';
import {useTailwind} from 'tailwind-rn';
import {Control, useController} from 'react-hook-form';
import {
  FieldPath,
  FieldPathValue,
  FieldValues,
  RegisterOptions,
  UnpackNestedValue,
} from 'react-hook-form/dist/types';
import ConditionalFragment from '../ConditionalFragment';
import Text, {TextStringSizeEnum} from '../Text/BaseText';

interface TextInputComponent {
  propTypes?: WeakValidationMap<RNTextInputProps> | undefined;
  contextTypes?: ValidationMap<any> | undefined;
  defaultProps?: Partial<RNTextInputProps> | undefined;
  displayName?: string | undefined;

  <
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  >(
    props: PropsWithChildren<
      Omit<RNTextInputProps, 'defaultValue'> & {
        control: Control<TFieldValues>;
        name: TName;
        rules?: Omit<
          RegisterOptions<TFieldValues, TName>,
          'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
        >;
        defaultValue?: UnpackNestedValue<FieldPathValue<TFieldValues, TName>>;
        displayErrorMessage?: boolean;
      }
    >,
    context?: any,
  ): ReactElement<any, any> | null;
}

export const TextInput: TextInputComponent = ({
  control,
  rules,
  name,
  defaultValue,
  displayErrorMessage = true,
  ...props
}) => {
  const tailwind = useTailwind();
  const {
    field: {value, onChange, onBlur},
    fieldState: {invalid, error},
  } = useController({
    control,
    name,
    rules,
    defaultValue,
  });

  return (
    <React.Fragment>
      <RNTextInput
        {...props}
        value={value}
        onChangeText={onChange}
        onBlur={onBlur}
        style={tailwind(
          classNames('py-2 px-3', 'border text-[1rem]', 'rounded-[2px]', {
            'border-gray300': !invalid,
            'border-[#FF9999]': invalid,
          }),
        )}
      />
      <ConditionalFragment condition={displayErrorMessage && invalid}>
        <Text
          fontSize={TextStringSizeEnum.md}
          style={tailwind('mt-2 text-[#FF9999]')}>
          {error?.message}
        </Text>
      </ConditionalFragment>
    </React.Fragment>
  );
};
