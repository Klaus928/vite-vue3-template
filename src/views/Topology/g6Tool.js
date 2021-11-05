import G6 from '@antv/g6';
import { getMapImgSrc } from "@/utils/tool"

export const defaultStateStyles = {
  hover: {
    stroke: '#fff',
    lineWidth: 2,
  },
  selected: {
    stroke: '#f00',
    lineWidth: 3
  }
};
export function registNodeEdge() {
  G6.registerNode('deviceNode',
    {
      options: {
        size: 50,
        // stroke: '#91d5ff',
        // fill: '#91d5ff',
      },
      draw(cfg, group) {
        const styles = this.getShapeStyle(cfg);
        const { labelCfg = {} } = cfg;
        const w = styles.width;
        const h = styles.height;
        const keyShape = group.addShape('rect', {
          attrs: {
            ...styles,
            x: -w / 2,
            y: -h / 2,
          },
        });
        group.addShape('image', {
          attrs: {
            x: 8 - w / 2,
            y: 8 - h / 2,
            width: 24,
            height: 24,
            img: getMapImgSrc("设备"),
          },
          name: 'image-shape',
        });
        if(cfg.powerInfo) {
          group.addShape('image', {
            attrs: {
              x: 50 - w / 2,
              y: 8 - h / 2,
              width: 24,
              height: 24,
              img: getMapImgSrc("电源箱"),
            },
            name: 'image-shape',
          });
          group.addShape('path', {
            attrs: {
              path: [
                ['M', 8 - w / 2 + 22, 0],
                ['L', 50 - w / 2, 0],
              ],
              stroke: '#e6a23c',
              lineWidth: 1,
            },
            name: 'path-shape',
            draggable: true,
  
          });
        }
        
        // if (cfg.label) {
        //   group.addShape('text', {
        //     attrs: {
        //       ...labelCfg.style,
        //       text: cfg.label,
        //       fill: '#333',
        //       x: 6 - w / 2,
        //       y: 50 - h / 2,
        //     },
        //   });
        // }
        return keyShape;
      },
      setState(name, value, item) {
        // console.log("name:" + name, 'value:' + value);
        // console.log("node:", node);
        const group = item.getContainer();
        const shape = group.get('children')[0]; // 顺序根据 draw 时确定
        // console.log('shape', value);
        switch (name) {
          case 'hover':
            if (value) {
              shape.attr({
                fill: '#C0C4CC',
                shadowBlur: 10,
                shadowColor: '#fff'
              });
            } else {
              shape.attr({
                fill: '',
              });
            }
            break;
          case 'selected':
            if (value) {
              shape.attr({
                stroke: '#03FFEA',
                lineWidth: 3
              });
            } else {
              shape.attr({
                stroke: '',
                lineWidth: 0
              });
            }
            break
        }
      },
      // afterDraw: function afterDraw(cfg, group) {
      //   var shape = group.get('children')[0];
      //   shape.animate({
      //     repeat: true,
      //     onFrame: function onFrame(ratio) {
      //       var diff = ratio <= 0.5 ? ratio * 10 : (1 - ratio) * 10;
      //       return {
      //         r: cfg.size / 2 + diff
      //       };
      //     }
      //   }, 3000, 'easeCubic');
      // }
    },
    'rect'
  );
  G6.registerNode('switchNode', {
    options: {
      size: 30,
    },
    draw(cfg, group) {
      const styles = this.getShapeStyle(cfg);
      const { labelCfg = {} } = cfg;
      const w = styles.width;
      const h = styles.height;
      const keyShape = group.addShape('rect', {
        attrs: {
          ...styles,
          x: -w / 2,
          y: -h / 2,
        },
      });
      group.addShape('image', {
        attrs: {
          x: - w / 2 + 15,
          y: - h / 2 + 15,
          width: 24,
          height: 24,
          img: getMapImgSrc("交换机"),
        },
        name: 'image-shape',
      });
      // if (cfg.label) {
      //   group.addShape('text', {
      //     attrs: {
      //       ...labelCfg.style,
      //       text: cfg.label,
      //       fill: '#333',
      //       x: 6 - w / 2,
      //       y: 55 - h / 2,
      //     },
      //   });
      // }
      return keyShape;
    },
    setState(name, value, item) {
      // console.log("name:" + name, 'value:' + value);
      // console.log("node:", node);
      const group = item.getContainer();
      const shape = group.get('children')[0]; // 顺序根据 draw 时确定
      // console.log('shape', value);
      switch (name) {
        case 'hover':
          if (value) {
            shape.attr({
              fill: '#C0C4CC',
              shadowBlur: 10,
              shadowColor: '#fff'
            });
          } else {
            shape.attr({
              fill: '',
            });
          }
          break;
        case 'selected':
          if (value) {
            shape.attr({
              stroke: '#03FFEA',
              lineWidth: 3
            });
          } else {
            shape.attr({
              stroke: '',
              lineWidth: 0
            });
          }
          break
      }
    }
  }, 'rect')
  G6.registerEdge('flow-line', {
    draw(cfg, group) {
      const startPoint = cfg.startPoint;
      const endPoint = cfg.endPoint;

      const { style } = cfg;
      const shape = group.addShape('path', {
        attrs: {
          stroke: style.stroke,
          // endArrow: style.endArrow,
          path: [
            ['M', startPoint.x, startPoint.y],
            ['L', startPoint.x, (startPoint.y + endPoint.y) / 2],
            ['L', endPoint.x, (startPoint.y + endPoint.y) / 2],
            ['L', endPoint.x, endPoint.y],
          ],
        },
      });

      return shape;
    },
  });
}

export const defaultLayout = {
  type: 'compactBox',
  direction: 'TB',
  getId: function getId(d) {
    // console.log("id", d);
    return d.id;
  },
  getHeight: function getHeight(d) {
    if (!d.id) {
      return -80
    }
    else {
      return 26
    }
    // if (d && d.id && d.id.indexOf('switch') != -1) {
    //   console.log("siwthc", d);
    //   return 40
    // } else {
    //   return 16;
    // }
  },
  getWidth: function getWidth() {
    return 10;
  },
  getVGap: function getVGap() {
    return 40;
  },
  getHGap: function getHGap() {
    return 50;
  },
};