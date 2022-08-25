import { ISchema } from '@formily/json-schema'
import {
    ReactionsSetter,
    DataSourceSetter,
    ValidatorSetter,
} from '@formily/element-plus-setters'
import { AllSchemas } from '../../schemas'
// TODO::setter没做
// 预制schema配置 【组件属性】
/**
 * 
 * @param component 
 * @param decorator 
 * @returns 
 * 
 * 取默认 AllSchemas 中的配置
 * component-group 组件属性
 * decorator-group 容器属性
 * component-style-group 组件样式
 * decorator-style-group 容器样式
 */
export const createComponentSchema = (component: ISchema, decorator: ISchema) => {
    return {
        'component-group': component && {
            type: 'void', 
            'x-component': 'CollapseItem', 
            'x-reactions': {
                fulfill: {
                    state: {
                        visible: '{{!!$form.values["x-component"]}}'
                    }
                }
            },
            properties: {
                'x-component-props': component
            }
        },
        'decorator-group': decorator && {
            type: 'void',
            'x-component': 'CollapseItem',
            'x-component-props': { defaultExpand: false },
            'x-reactions': {
                fulfill: {
                    state: {
                        visible: '{{!!$form.values["x-decorator"]}}'
                    }
                }
            },
            properties: {
                'x-decorator-props': decorator
            }
        },
        'component-style-group': { // 组件样式
            type: 'void',
            'x-component': 'CollapseItem',
            'x-component-props': { defaultExpand: false },
            'x-reactions': {
                fulfill: {
                    state: {
                        visible: '{{!!$form.values["x-component"]}}'
                    }
                }
            },
            properties: {
                'x-component-props.style': AllSchemas.CSSStyle
            }
        },
        'decorator-style-group': { // 容器样式
            type: 'void',
            'x-component': 'CollapseItem',
            'x-component-props': { defaultExpand: false },
            'x-reactions': {
                fulfill: {
                    state: {
                        visible: '{{!!$form.values["x-decorator"]}}'
                    }
                }
            },
            properties: {
                'x-decorator-props.style': AllSchemas.CSSStyle
            }
        }
    }
}


// 预制一份schema配置 【字段属性】
export const createFieldSchema = (component?: ISchema, decorator: ISchema = AllSchemas.FormItem): ISchema => {
    return {
        type: 'object',
        properties: {
            'field-group': {
                type: 'void',
                'x-component': 'CollapseItem',
                properties: {
                    name: { // 字段标识
                        type: 'string',
                        'x-decorator': 'FormItem',
                        'x-component': 'Input',
                        'x-component-props': {
                            clearable: true
                        }
                    },
                    title: { // 标题
                        type: 'string',
                        'x-decorator': 'FormItem',
                        'x-component': 'Input',
                        'x-component-props': {
                            clearable: true,
                            title: ''
                        }
                    },
                    description: { // 描述
                        type: 'string',
                        'x-decorator': 'FormItem',
                        'x-component': 'Input.TextArea',
                        'x-component-props': {
                            rows: 1
                        }
                    },
                    'x-display': { // 展示状态
                        default: 'visible',
                        type: 'string',
                        enum: ['visible', 'hidden', 'none', ''],
                        'x-decorator': 'FormItem',
                        'x-component': 'Select',
                        'x-component-props': {}
                    },
                    // 'x-pattern': { // ui状态
                    //     default: 'editable',
                    //     type: 'string',
                    //     enum: ['editable', 'disabled', 'readOnly', 'readPretty', ''],
                    //     'x-decorator': 'FormItem',
                    //     'x-component': 'Select',
                    //     'x-component-props': {}
                    // },
                    default: { // 默认值
                        'x-decorator': 'FormItem',
                        'x-component': 'ValueInput',
                        'x-value': ''
                    },
                    // enum: { // 可选项
                    //     'x-decorator': 'FormItem',
                    //     'x-component': DataSourceSetter,
                    // },
                    // 'x-reactions': {  //响应器规则
                    //     'x-decorator': 'FormItem',
                    //     'x-component': ReactionsSetter,
                    // },
                    // 'x-validator': { // 校验规则
                    //     type: 'array',
                    //     'x-component': ValidatorSetter
                    // },
                    required: { // 必填
                        type: 'boolean',
                        'x-decorator': 'FormItem',
                        'x-component': 'Switch'
                    }
                }
            },
          ...createComponentSchema(component, decorator),

        }
    }
}

export const createVantFieldSchema = (component?: ISchema, decorator: ISchema = AllSchemas.FormItem) => {
   return {
    type: 'object',
    properties: {
        'field-group': {
            type: 'void',
            'x-component': 'CollapseItem',
            properties: {
                name: { // 字段标识
                    type: 'string',
                    'x-decorator': 'FormItem',
                    'x-component': 'Input',
                    'x-component-props': {
                        clearable: true
                    }
                },
                label: {}
            }
        }
    }
   } 
}

export const createVoidFieldSchema = (component?: ISchema, decorator: ISchema = AllSchemas.FormItem) => {
    return {
        type: 'object',
        properties: {
            'field-group': {
                type: 'void',
                'x-component': 'CollapseItem',
                properties: {
                    name: {
                        type: 'string',
                        'x-decorator': 'FormItem',
                        'x-component': 'Input',
                        'x-component-props': {
                            clearable: true
                        }
                    },
                    title: {
                        type: 'string',
                        'x-decorator': 'FormItem',
                        'x-component': 'Input',
                        'x-component-props': {
                            clearable: true
                        },
                        'x-reactions': {
                            fulfill: {
                                state: {
                                    hidden: '{{$form.values["x-decorator"] !== "FormItem"}}'
                                }
                            }
                        }
                    },
                    description: {
                        type: 'string',
                        'x-decorator': 'FormItem',
                        'x-component': 'Input.TextArea',
                        'x-reactions': {
                            fulfill: {
                                state: {
                                    hidden: '{{$form.values["x-decorator"] !== "FormItem"}}'
                                }
                            }
                        }
                    },
                    'x-display': {
                        default: 'visible',
                        type: 'string',
                        enum: ['visible', 'hidden', 'none', ''],
                        'x-decorator': 'FormItem',
                        'x-component': 'Select',
                        'x-component-props': {
                            clearable: true
                        }
                    },
                    'x-pattern': {
                        default: 'editable',
                        type: 'string',
                        enum: ['editable', 'disabled', 'readOnly', 'readPretty', ''],
                        'x-decorator': 'FormItem',
                        'x-component': 'Select',
                        'x-component-props': {
                            clearable: true
                        }
                    },
                    'x-reactions': {
                        'x-display': 'hidden',
                        'x-decorator': 'FormItem',
                        'x-component': 'ReactionsSetter'
                    },
                    'x-decorator': {
                        type: 'string',
                        'x-decorator': 'FormItem',
                        'x-component': 'FormItemSwitcher'
                    }
                }
            },
            ...createComponentSchema(component, decorator)
        }
    }
}
