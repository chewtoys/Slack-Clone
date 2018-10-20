import { createSelector } from "reselect";

import { getCurrentTeamMemberList } from "./team.reducer";
import constants from "../constants";

const initialState = {
  isSidebarOpen: false,
  rightSidebarView: "team",
  targetUserId: null
};

export default (state = initialState, action) => {
  const newState = { ...state };
  switch (action.type) {
    case constants.GLOBAL_RIGHT_SIDEBAR_TOGGLE:
      newState.isSidebarOpen = !newState.isSidebarOpen;
      return newState;

    case constants.GLOBAL_RIGHT_SIDEBAR_VIEW_SWITCH:
      if (action.payload !== "user-profile") {
        newState.targetUserId = null;
      }
      newState.rightSidebarView = action.payload;
      return newState;

    case constants.GLOBAL_TARGET_USER_SWITCH:
      newState.targetUserId = action.payload;
      return newState;

    case constants.USER_FETCH_LOGOUT:
      return initialState;

    default:
      return state;
  }
};

/* state selectors */
const getTargetUserId = state => state.globalStateReducer.targetUserId;

export const getIsSidebarOpen = state => state.globalStateReducer.isSidebarOpen;

export const getRightSidebarView = state =>
  state.globalStateReducer.rightSidebarView;

export const getRightSidebarTitle = createSelector(
  getRightSidebarView,
  rightSidebarView =>
    rightSidebarView
      .replace(/-/g, " ")
      .split(" ")
      .map(s => s.charAt(0).toUpperCase() + s.substring(1))
      .join(" ")
);

export const getTargetUser = createSelector(
  getCurrentTeamMemberList,
  getTargetUserId,
  (currentTeamMemberList, targetUserId) => {
    const targetUser = currentTeamMemberList.filter(
      teamMember => teamMember.id === targetUserId
    );
    return targetUser[0];
  }
);
