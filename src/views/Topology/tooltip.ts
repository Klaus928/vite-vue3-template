export default {
  // 根节点
  switch: (param?: any) => {
    console.log('param: ', param);
    return `
      <table style='max-height: 300px;overflow: auto;'>
        <tbody>
          <tr><th style='min-width: 60px;'>巷道名称：</th><td>${param.roadWayName || ""}</td></tr>
        </tbody>
      </table>`;
  },
  // 基站设备
  device: (param?: any) => {
    console.log('param: ', param);
    const hasPower = !!param.powerInfo;
    return `
      <p>基站信息：</p>
      <table style='max-height: 300px;overflow: auto;'>
        <tbody>
          <tr><th style='min-width: 80px;'>基站名称：</th><td>${param.name}</td></tr>
          <tr><th style='min-width: 80px;'>基站编号：</th><td>${param.number}</td></tr>
          <tr><th style='min-width: 80px;'>上级基站：</th><td>${param.parentWorkSiteNum}</td></tr>
          <tr><th style='min-width: 80px;'>基站类型：</th><td>${param.workSiteType}</td></tr>
          <tr><th style='min-width: 80px;'>安装位置：</th><td>${param.address}</td></tr>
        </tbody>
      </table>
      ${hasPower ? `<p>电源信息：</p>
      <table style='max-height: 300px;overflow: auto;'>
        <tbody>
          <tr><th style='min-width: 80px;'>电源编号：</th><td>${param.powerInfo.powerId}</td></tr>
          <tr><th style='min-width: 80px;'>供电方式：</th><td>${param.powerInfo.StateDes}</td></tr>
          <tr><th style='min-width: 80px;'>电源IP：</th><td>${param.powerInfo.IpAddress}</td></tr>
          <tr><th style='min-width: 80px;'>状态：</th><td>${param.powerInfo.State}</td></tr>
          <tr><th style='min-width: 80px;'>剩余电量：</th><td>${param.powerInfo.soc}</td></tr>
        </tbody>
      </table>` : ''}
      `;
  },
}