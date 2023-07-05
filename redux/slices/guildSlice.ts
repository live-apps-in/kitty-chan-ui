import { GuildDto } from '@/types/AllGuilds';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

type GuildState = {
  currentGuildId: string | null;
  allGuilds: GuildDto[] | null;
};

type InitialState = {
  value: GuildState;
};

const initialState = {
  value: {
    currentGuildId: Cookies.get('current-guild')
      ? JSON.parse(Cookies.get('current-guild')!)
      : null,
    allGuilds: Cookies.get('all-guilds')
      ? JSON.parse(Cookies.get('all-guilds')!)
      : null,
  },
} as InitialState;

export const guild = createSlice({
  name: 'guild',
  initialState,
  reducers: {
    setAllGuilds: (state, action: PayloadAction<GuildDto[]>) => {
      return {
        value: {
          ...state.value,
          allGuilds: action.payload,
        },
      };
    },

    setCurrentGuildId: (state, action: PayloadAction<string>) => {
      return {
        value: {
          ...state.value,
          currentGuild: action.payload,
        },
      };
    },
  },
});

export const { setAllGuilds, setCurrentGuildId } = guild.actions;
export default guild.reducer;
