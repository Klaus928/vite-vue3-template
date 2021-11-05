<template>
  <div class="canvas-container">
    <div style="display: flex; justify-content: space-around;padding-top: 20px;">
      <div>
        <el-button type="primary" size="small" @click="addDevice">添加设备</el-button>
        <el-button type="primary" size="small" @click="editDevice">修改设备</el-button>
        <el-button type="primary" size="small" @click="removeDevice">删除设备</el-button>
      </div>
      <div>
        <span>设备总数：{{totalCount}}</span>&nbsp;&nbsp;&nbsp;&nbsp;
        <span>未录入设备：{{disBinding}}</span>
      </div>
    </div>
    <div id="container"></div>
    <el-dialog v-model="dialogFormVisible" title="设备">
      <el-form :model="form">
        <el-form-item label="基站名称" :label-width="formLabelWidth">
          <el-input v-model="form.workSiteName" autocomplete="off" readonly></el-input>
        </el-form-item>
        <el-form-item label="电源" :label-width="formLabelWidth">
          <el-select v-model="form.powerId" placeholder="请选择电源" style="width: 100%;">
            <el-option v-for="item in powerArray" 
            :key="item.powerId"
            :label="item.powerId  + '--' + (item.StateDes || item.State)" 
            :value="item.powerId"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" :loading="submitBtn" @click="submitDevice">确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
  import G6 from '@antv/g6';
  import { registNodeEdge, defaultLayout, defaultStateStyles } from "./g6Tool";
  import { ElMessage, ElMessageBox, ElLoading } from 'element-plus'
  import { reactive, toRefs, getCurrentInstance, ref, unref, watch, createApp, createVNode, render, defineComponent } from 'vue'
  import { requestStoreList } from '@/store'
  import toolTip from './tooltip'
  let option: any =  {
    container: 'container',
    width: 1380,
    height: 800,
    linkCenter: true,
    plugins: [],
    modes: {
      default: [
        { type: "click-select", multiple: false },
        {
          type: 'drag-node', updateEdge: false, enableDelegate: true,
          shouldBegin(e) {
            if (e.item._cfg.id.slice(0, 6) === 'switch') {
              return true
            }
          }
        },
        "drag-canvas",
        "zoom-canvas",
      ],
    },
    defaultNode: {
      type: 'circle',
      size: 50,
      // style: defaultNodeStyle,
      labelCfg: {
        style: {
          fill: '#fff',
          fontSize: 14,
        },
      },
      style: {
        cursor: 'pointer',
      }
    },
    defaultEdge: {
      type: 'flow-line',
      style: {
        stroke: '#91d5ff',
        endArrow: {
          path: 'M 0,0 L 12, 6 L 9,0 L 12, -6 Z',
          fill: '#91d5ff',
          d: -20,
        },
      },
    },
    fitViewPadding: [20, 40, 50, 20],
    layout: defaultLayout,
  }
  export default defineComponent({
    name: "Topology",
    setup(props, context) {
      const store = requestStoreList['Topology']();
      let graph: any = ref(null)
      let allDevices: any = reactive([]);
      let selectedNodeItems = reactive([])
      let powerArray: any = reactive({
        powerArray: []
      })
      let submitBtn = ref(false)
      let totalCount: any = ref(0)
      let disBinding: any = ref(0)
      let isEdit: any = ref(null);
      const getData = async() => {
        totalCount.value = 0;
        disBinding.value = 0;
        let res = await store.getTopologyGraphList();
        res.sort((x,y) => {
          return x.roadWayId - y.roadWayId;
        })
        for(let item of res) {
          if(item.workSiteInfo && item.workSiteInfo.length > 0) {
            totalCount.value += item.workSiteInfo.length
            for(let j of item.workSiteInfo) {
              if(!j.powerInfo) {
                disBinding.value += 1
              }
              if(j.is4GWorkSite === 1) {
                console.log("有-------------")
              }
            }
          }
        }
        const translateDataToTree = (data) => {
          // 没有父节点的数据
          let parents = data.filter(value => value.pid == 'undefined' || value.pid == null || value.pid == '')
          // 有父节点的数据
          let workSiteInfo = data.filter(value => value.pid !== 'undefined' && value.pid != null && value.pid != '')
        
          let translator = (parents, workSiteInfo) => {
            parents.forEach((parent) => {
              workSiteInfo.forEach((current, index) => {
                // 此时找到父节点对应的一个子节点
                if (current.pid === parent.id) {
                  let temp = JSON.parse(JSON.stringify(workSiteInfo))
                  temp.splice(index, 1)
                  parent.workSiteInfo ? parent.workSiteInfo.push(current) : parent.workSiteInfo = [current]
                  translator([current], temp)
                }
              })
            })
          }
        
          translator(parents, workSiteInfo)
        
          return parents
        }
        const newArr = res.map((item) => treeMap(item));
        function treeMap(item: {id: any,name: any, workSiteInfo: [], roadWayName: string, roadWayId: number, description: string}) {
          const hasChild = item.workSiteInfo && item.workSiteInfo.length > 0;
          if(hasChild) {
            for(let i = 0; i < item.workSiteInfo.length; i++) {
              item.workSiteInfo[i].parentId = item.roadWayId
              if(i !== 0) {
                const idx = i - 1;
                item.workSiteInfo[i].pid = item.workSiteInfo[idx].id;
                item.workSiteInfo[i].parentWorkSite = item.workSiteInfo[idx].number
              } else {
                item.workSiteInfo[i].pid = ""
              }
            }
            item.workSiteInfo = translateDataToTree(item.workSiteInfo);
          }
          if (item.roadWayName) {  // 说明是巷道
            return {
              ...item,
              id: "switch-" + item.roadWayId,
              label: item.roadWayName,
              type: 'switchNode',
              children: hasChild ? item.workSiteInfo.map((i) => treeMap(i)) : [],
            };
          }
          else {
            return {
              ...item,
              id: "device-" + item.id,
              label: item.name,
              type: 'deviceNode',
              children: hasChild ? item.workSiteInfo.map((i) => treeMap(i)) : [],
            }
          }
        }
        allDevices = newArr;
        allDevices.push({ type: 'image', style: { opacity: 0 } })
        allDevices.unshift({ type: 'image', style: { opacity: 0 } })
      }
      const getTooltip = () => {
        const tooltip = new G6.Tooltip({
          offsetX: 10,
          offsetY: 10,
          trigger: 'click',
          itemTypes: ["node"],
          fixToNode: [1, 0.5],
          getContent(e: any) {
            const outDiv = document.createElement("div");
            if (e.item.getModel()) {
              let type = e.item.getModel().id.slice(0, 6);
              if (type === 'switch') {
                outDiv.style.width = '200px'
              } else if (type === 'device') {
                outDiv.style.width = '250px'
              } else {
                outDiv.style.display = 'none'
              }
              outDiv.innerHTML = toolTip[type]({
                ...e.item.getModel(),
                name: e.item.getModel().label || '',
              })
            }
            return outDiv;
          },

        });
        return tooltip
      }
      const paint = () => {
        if (graph.value) {
          graph.value.destroy();
        }
        const loading = ElLoading.service({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)',
        })
        getData().then(() => {
          loading.close();
          const graphData = {
            type: 'image',
            style: {
              opacity: 0
            },
            children: allDevices
          };
          const container = document.getElementById('container');
          const width = document.querySelector('body').clientWidth * 1 || 1380;
          const height = document.querySelector('body').clientHeight - 0 || 800;
          option = Object.assign(option, { width, height, plugins: [getTooltip()] })
          graph.value = new G6.TreeGraph(option);
          graph.value.read(graphData);
          // graph.value.render();
          graph.value.fitView();

          graph.value.on('node:mouseenter', (evt) => {
            const { item } = evt;
            const id = item._cfg.id.slice(0, 7)
            if (id === 'switch-' || id === 'device-') {
              graph.value.setItemState(item, 'hover', true);
            }
          });

          graph.value.on('node:mouseleave', (evt) => {
            const { item } = evt;
            const id = item._cfg.id.slice(0, 7)
            if (id === 'switch-' || id === 'device-') {
              graph.value.setItemState(item, 'hover', false);
            }
          });
          graph.value.on('node:click', (evt) => {
            const { item, target } = evt;
            const targetType = target.get('type');
            const name = target.get('name');
          });
          graph.value.on("nodeselectchange", (ev) => {
            const item = ev.target;
            const type = item._cfg.currentShape
            if (type === "deviceNode") {
              selectedNodeItems = ev.selectedItems.nodes;
            }
          });
          graph.value.on('dragend', (evt) => {
            const { item } = evt;
            const type = item ? item._cfg.id.slice(0, 6) : ''
            if (type === 'switch') {
              // 得到拖拽后的交换机x值
              const NodeArr = graph.value.cfg.data.children.filter(i1 => {
                const iType = i1.id.slice(0, 6)
                return iType === 'switch'
              }).map(i2 => {
                return { label: i2.label, x: i2.x, id: i2.id.slice(7) }
              })
              NodeArr.sort((x,y) => {
                return x.x - y.x
              })
              // this.changeSort(NodeArr.map(item => item.id))
            }
          })
          if (typeof window !== 'undefined')
            window.onresize = () => {
              if (!graph.value || graph.value.get('destroyed')) return;
              if (!container || !container.scrollWidth || !container.scrollHeight) return;
              graph.value.changeSize(container.scrollWidth, container.scrollHeight);
            };
        }).catch(() => {
          loading.close();
          ElMessage({
            type: 'error',
            message: '服务器错误',
          })
        });
      };
      registNodeEdge();
      paint();

      let form = reactive({
        workSiteName: "",
        workSiteNum: "",
        powerId: "",
      })

      const atLeastOneDevice = (text): void => {
        ElMessageBox.alert(text, '提示', {
          confirmButtonText: '确认',
          callback: (action) => {
            console.log('action: ', action);
          },
        })
      }
      const addDevice = () => {
        const model: object = (selectedNodeItems[0] as any)._cfg.model;
        if(selectedNodeItems.length > 0 && (model as any).powerInfo == null) {
          isEdit.value = null;
          dialogFormVisible.value = true;
          form.workSiteName = (selectedNodeItems[0] as any)._cfg.model.name;
          form.workSiteNum = (selectedNodeItems[0] as any)._cfg.model.number;
          form.powerId = "";
          store.getNoBindPowerList().then(res => {
            powerArray.powerArray = res
          }) 
        } else {
          atLeastOneDevice("请选择一个未添加电源的基站")
        }
      }
      const editDevice = () => {
        const model: object = (selectedNodeItems[0] as any)._cfg.model;
        if(selectedNodeItems.length > 0 && (model as any).powerInfo != null) {
          isEdit.value = (model as any).powerInfo.powerId;
          dialogFormVisible.value = true;
          form.workSiteName = (model as any).name;
          form.workSiteNum = (model as any).number;
          store.getNoBindPowerList().then(res => {
            powerArray.powerArray = res;
            powerArray.powerArray.unshift((model as any).powerInfo);
            form.powerId = (model as any).powerInfo.powerId;
          })
        } else {
          atLeastOneDevice("请选择一个已经添加电源的基站")
        }
      }
      const removeDevice = () => {
        const model: object = (selectedNodeItems[0] as any)._cfg.model;
        if(selectedNodeItems.length > 0 && (model as any).powerInfo != null) {
          ElMessageBox.confirm(
          `请确认移除选择基站(${(model as any).name})的电源?`,
          '提示',
          {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'warning',
          }
        )
          .then(() => {
            store.deleTeWorkSiteAndPowerRelation({
              workSiteNum: (model as any).number,
              powerId: (model as any).powerInfo.powerId,
            }).then(() => {
              ElMessage({
                type: 'success',
                message: '移除成功',
              })
              paint();
            }).catch(() => {
              ElMessage({
                type: 'info',
                message: '移除电源出现异常',
              })
            })
          })
          .catch(() => {
            console.log();
          })
        } else {
          atLeastOneDevice("请选择一个已经添加电源的基站")
        }
      }

      const submitDevice = () => {
        form.workSiteNum = (selectedNodeItems[0] as any)._cfg.model.number;
        submitBtn.value = true;
        if(isEdit.value) {
          store.deleTeWorkSiteAndPowerRelation({
            workSiteNum: form.workSiteNum,
            powerId: isEdit.value,
          }).then(() => {
            store.bindWorkSiteAndPower({
              workSiteNum: form.workSiteNum,
              powerId: form.powerId,
            })
          }).then(() => {
            dialogFormVisible.value = false;
            submitBtn.value = false;
            paint();
            ElMessage({
              type: 'success',
              message: '绑定成功',
            })
          }).catch(err => {
            console.log('err: ', err);
            ElMessage({
              type: 'error',
              message: '绑定失败',
            })
          })
        } else {
          store.bindWorkSiteAndPower({
            workSiteNum: form.workSiteNum,
            powerId: form.powerId,
          }).then(() => {
            dialogFormVisible.value = false;
            submitBtn.value = false;
            paint();
            ElMessage({
              type: 'success',
              message: '绑定成功',
            })
          }).catch(err => {
            console.log('err: ', err);
            ElMessage({
              type: 'error',
              message: '绑定失败',
            })
          })
        }
      }
      
      
      const dialogFormVisible = ref(false)
      const formLabelWidth = ref('120px')
      return {
        addDevice,
        editDevice,
        removeDevice,
        submitDevice,
        submitBtn,
        formLabelWidth,
        dialogFormVisible,
        form,
        totalCount,
        disBinding,
        ...toRefs(powerArray)
      }
    },
  });
</script>
<style scoped>
.canvas-container, #container {
  height: 100%;
  width: 100%;
  background-color: #EFEFEF;
  position: relative;
  overflow: hidden;
}
</style>
