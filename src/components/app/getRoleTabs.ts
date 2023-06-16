import { mainTabsContent, mainTabsTitle } from "./tabsMaps";
import type {
  AllTabsNames,
  GetRoleTabsArgs,
  NavBarScreen,
  ResultTypeGetRoleTabs,
} from "./types";

const getRoleTabs = ({
  inputRolesArray,
  tabsTitleArray = mainTabsTitle,
  tabsContentArray = mainTabsContent,
}: GetRoleTabsArgs): ResultTypeGetRoleTabs => {
  const tabSet = new Set<AllTabsNames>();
  const allTabsList: NavBarScreen[] = [];
  let resultArray: ResultTypeGetRoleTabs = [];
  for (const role of inputRolesArray) {
    const tabsArray = tabsTitleArray.get(role);
    if (tabsArray) {
      for (const tab of tabsArray) {
        tabSet.add(tab);
      }
    }
  }
  for (const tabName of tabSet) {
    const tabFromMap = tabsContentArray.get(tabName);
    if (tabFromMap) {
      allTabsList.push(tabFromMap);
    }
  }
  for (const tab of allTabsList) {
    let nextNavTab;
    if (tab.mainInGroup) {
      nextNavTab = allTabsList.filter(
        (item) => item.groupId === tab.mainInGroup
      );
      nextNavTab.unshift(tab);
    } else {
      nextNavTab = tab;
    }
    resultArray.push(nextNavTab);
  }
  resultArray = resultArray.filter((item) => {
    if (Array.isArray(item)) {
      return true;
    } else {
      return !item.groupId;
    }
  });
  return resultArray;
};

export default getRoleTabs;
