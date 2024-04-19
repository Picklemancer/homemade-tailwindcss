import React, { useState } from 'react';
import { default as ReactSelect, createFilter, components } from 'react-select';
import { clsx } from '../utils';

const filterOption = createFilter();

const Option = ({ getChildren = (props) => props.children, ...props }) => (
  <components.Option {...props}>{getChildren(props)}</components.Option>
);

const variants = {
  flat: {
    default: {
      control: () =>
        '!border-none !bg-slate-200 hover:!bg-slate-300 dark:!bg-slate-800 dark:hover:!bg-slate-700',
      menu: () => '!border-none !bg-slate-200 dark:!bg-slate-800',
      option: ({ isSelected }) =>
        clsx(
          'hover:!bg-slate-300 dark:hover:!bg-slate-700',
          isSelected
            ? '!bg-slate-400 dark:!bg-slate-600'
            : '!bg-slate-200 dark:!bg-slate-800'
        ),
    },
  },
  bordered: {},
  faded: {},
  underlined: {},
};

const sizes = {
  sm: {
    control: () => 'text-xs !rounded-lg !h-8',
    menu: () => '!rounded-lg',
    menuList: () => 'rounded-lg',
    option: () => '!text-xs',
  },
  md: {
    control: () => 'text-sm !rounded-xl !h-10',
    menu: () => '!rounded-xl',
    menuList: () => 'rounded-xl',
    option: () => '!text-sm',
  },
  lg: {
    control: () => 'text-base !rounded-2xl !h-12',
    menu: () => '!rounded-2xl',
    menuList: () => 'rounded-2xl',
    option: () => '!text-base',
  },
  xl: {
    control: () => 'text-lg !rounded-2xl !h-14',
    menu: () => '!rounded-2xl',
    menuList: () => 'rounded-2xl',
    option: () => '!text-lg',
  },
};

const BaseSelect = ({
  className,
  size = 'lg',
  variant = 'flat',
  color = 'default',
  isDisabled = false,
  isMultiple = false,
  getOptionLabel = (item) => item.label,
  getOptionValue = (item) => item.value,
  children = (option) => option.children,
  ...props
}) => {
  const classNames = {
    // container: () => '',
    control: () =>
      clsx(
        '!cursor-pointer',
        isDisabled && 'opacity-50 pointer-events-none',
        sizes[size].control(),
        variants[variant][color].control()
      ),
    dropdownIndicator: () => '!text-slate-500',
    // group: () => '',
    // groupHeading: () => '',
    // indicatorsContainer: () => '',
    indicatorSeparator: () => 'invisible',
    input: () => '!text-black dark:!text-white',
    // loadingIndicator: () => '',
    // loadingMessage: () => '',
    menu: () => clsx(sizes[size].menu(), variants[variant][color].menu()),
    menuList: () => clsx('!p-0', sizes[size].menuList()),

    // menuPortal: () => '',
    // multiValue: () => '',
    // multiValueLabel: () => '',
    // multiValueRemove: () => '',
    // noOptionsMessage: () => '',
    option: (props) =>
      clsx(
        props.isDisabled
          ? 'opacity-50 pointer-events-none'
          : 'transition-colors !cursor-pointer',
        sizes[size].option(props),
        variants[variant][color].option(props)
      ),
    placeholder: () => '!text-black dark:!text-white',
    singleValue: () => '!text-black dark:!text-white',
    // valueContainer: () => '',
    // clearIndicator: () => '',
  };

  return (
    <ReactSelect
      {...props}
      components={{
        Option: (props) => <Option getChildren={children} {...props} />,
      }}
      isDisabled={isDisabled}
      isMulti={isMultiple}
      className={clsx('w-full', className)}
      classNames={classNames}
      getOptionLabel={getOptionLabel}
      getOptionValue={getOptionValue}
    />
  );
};

const ProgressiveSelect = ({
  options,
  getOptionLabel,
  getOptionValue,
  ...props
}) => {
  const N = 100;

  const [position, setPosition] = useState(N);
  const [opts, setOpts] = useState(options);

  const onInputChange = (value) =>
    setOpts(
      options.filter((option) =>
        filterOption(
          {
            label: getOptionLabel(option),
            value: getOptionValue(option),
            data: option,
          },
          value
        )
      )
    );

  const onMenuScrollToBottom = () => setPosition((prev) => prev + N);

  return (
    <BaseSelect
      {...props}
      options={opts.slice(0, position)}
      getOptionLabel={getOptionLabel}
      getOptionValue={getOptionValue}
      onMenuScrollToBottom={onMenuScrollToBottom}
      onInputChange={onInputChange}
    />
  );
};

export const Select = ({ options, ...props }) => {
  if (!options) throw Error('Missing required prop: options');

  if (options.length > 100)
    return <ProgressiveSelect options={options} {...props} />;
  return <BaseSelect options={options} {...props} />;
};

export default Select;
