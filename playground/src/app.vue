<template>
  <Designer :engine="engine">
    <Workbench>
      <StudioPanel>
        <template #logo>
          <LogoWidget />
        </template>
        <template #actions>
          <actions-widget />
        </template>

        <CompositePanel>
          <CompositePanelItem title="panels.Component" icon="Component">
            <ResourceWidget
              title="sources.VantComponents"
              :sources="sources.VantComponents"
            ></ResourceWidget>
            <ResourceWidget
              title="sources.Profession"
              :sources="sources.Profession"
            ></ResourceWidget>
            <ResourceWidget title="sources.Inputs" :sources="sources.Inputs" />
            <!-- <ResourceWidget
              title="sources.Layouts"
              :sources="sources.Layouts"
            /> -->
            <!-- <ResourceWidget title="sources.Arrays" :sources="sources.Arrays" /> -->
            <!-- <ResourceWidget
              title="sources.Displays"
              :sources="sources.Displays"
            /> -->
          </CompositePanelItem>
          <CompositePanelItem title="panels.OutlinedTree" icon="Outline">
            <OutlineTreeWidget />
          </CompositePanelItem>
          <CompositePanelItem title="panels.History" icon="History">
            <HistoryWidget />
          </CompositePanelItem>
        </CompositePanel>

        <WorkspacePanel :style="{ height: '100%' }">
          <ToolbarPanel>
            <DesignerToolsWidget />
            <ViewToolsWidget :use="['DESIGNABLE', 'JSONTREE', 'PREVIEW']" />
          </ToolbarPanel>

          <ViewportPanel>
            <!-- 组件 -->
            <ViewPanel type="DESIGNABLE">
              <ComponentTreeWidget
                :components="components"
              ></ComponentTreeWidget>
            </ViewPanel>

            <!-- JSONTREE -->
            <ViewPanel type="JSONTREE" :scrollable="false">
              <template #default="tree, onChange">
                <SchemaEditorWidget
                  :tree="tree"
                  @change="onChange"
                ></SchemaEditorWidget>
              </template>
            </ViewPanel>

            <!-- 预览 -->
            <ViewPanel type="PREVIEW" :scrollable="false">
              <template #default="tree, onChange">
                <PreviewWidget :tree="tree" />
              </template>
            </ViewPanel>
          </ViewportPanel>
        </WorkspacePanel>

        <SettingsPanel title="panels.PropertySettings">
          <SettingsForm />
        </SettingsPanel>
      </StudioPanel>
    </Workbench>
  </Designer>
</template>
<script lnag="ts">
import { createDesigner, GlobalRegistry } from '@designable/core'
import {
  Designer,
  Workbench,
  StudioPanel,
  CompositePanel,
  SettingsPanel,
  WorkspacePanel,
  ToolbarPanel,
  DesignerToolsWidget,
  ViewToolsWidget,
  ViewPanel,
  HistoryWidget,
  OutlineTreeWidget,
  ResourceWidget,
  ComponentTreeWidget,
  ViewportPanel,
} from '@formily/element-plus-prototypes'
import {
  Form,
  Field,
  Input,
  MyCard,
  Select,
  Checkbox,
  Transfer,
  Password,
  Upload,
  Text,
  ArrayCards,
  ObjectContainer,
  ArrayTable,
  Space,
  FormTab,
  FormCollapse,
  FormLayout,
  FormGrid,
  TreeSelect,
  Slider,
  VantInput,
  VantCalendar,
  VantCheckbox,
  VantPicker,
  VantFormLayout,
  VantForm,
  VantRadio,
  VantSpace,
  VantSwitch,
  VantRate,
  VantSlider,
  VantStepper,
  VantDatetimePicker,
  VantCascader,
} from '@formily/element-plus-renderer'

console.log(Checkbox, 'vantCheckboxGroupvantCheckboxGroup')
console.log(VantRadio, 'vantRadio')
console.log(VantDatetimePicker, 'VantDatetimePicker')

import { SettingsForm } from '@formily/element-plus-settings-form'
GlobalRegistry.registerDesignerLocales({
  'zh-CN': {
    sources: {
      VantComponents: 'Vant',
      Profession: '业务组件',
      Inputs: '输入控件',
      Layouts: '布局组件',
      Arrays: '自增组件',
      Displays: '展示组件',
    },
  },
  'en-US': {
    sources: {
      VantComponents: 'VantComponents',
      Profession: 'Profession',
      Inputs: 'Inputs',
      Layouts: 'Layouts',
      Arrays: 'Arrays',
      Displays: 'Displays',
    },
  },
})

import { defineComponent } from 'vue'
export default defineComponent({
  components: {
    Designer,
    Workbench,
    StudioPanel,
    CompositePanel,
    CompositePanelItem: CompositePanel.Item,
    SettingsPanel,
    WorkspacePanel,
    ToolbarPanel,
    DesignerToolsWidget,
    ViewToolsWidget,
    ViewPanel,
    HistoryWidget,
    OutlineTreeWidget,
    ResourceWidget,
    ComponentTreeWidget,
    ViewportPanel,
    SettingsForm,
  },
  setup() {
    const engine = createDesigner({
      shortcuts: [],
      rootComponentName: 'Form',
    })
    console.log('Input', Input)
    return {
      engine,
      components: {
        Form,
        Field,
        MyCard,
        // Card,
        // InputNumber,
        Select,
        Transfer,
        // Radio,
        Upload,
        ObjectContainer,
        Space,
        Text,
        ArrayCards,
        ArrayTable,
        FormGrid,
        FormLayout,
        FormTab,
        FormCollapse,
        TreeSelect,
        Slider,
        Password,
        VantInput,
        VantCalendar,
        VantCheckbox,
        VantPicker,
        VantFormLayout,
        VantForm,
        VantRadio,
        VantSpace,
        VantSwitch,
        VantRate,
        VantSlider,
        VantStepper,
        VantDatetimePicker,
        VantCascader,
      },
      sources: {
        Inputs: [
          Input,
          // Password,
          // InputNumber,
          // Rate,
          // Slider,
          // Select,
          // TreeSelect,
          // Cascader,
          // Transfer,
          Checkbox,
          // Radio,
          // DatePicker,
          // TimePicker,
          // Upload,
          // Switch,
          // ObjectContainer,
        ],
        Profession: [MyCard],
        VantComponents: [
          VantInput,
          VantCalendar,
          VantCheckbox,
          VantPicker,
          VantFormLayout,
          VantForm,
          VantRadio,
          VantSpace,
          VantSwitch,
          VantRate,
          VantSlider,
          VantStepper,
          VantDatetimePicker,
          VantCascader,
        ],
        Arrays: [ArrayCards, ArrayTable],
        // Displays: [Text],
        // Layouts: [Card, Space, FormGrid, FormLayout, FormTab, FormCollapse],
      },
    }
  },
})
</script>
