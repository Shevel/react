import { InferActionsType } from './redux-store';

export type MessageType = {
  id: number;
  string: string;
};

export type DialogType = {
  id: number;
  name: string;
};

const initialState = {
  messagesData: [
    {
      id: 1,
      string:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut alios omittam, hunc appello, quem ille unum secutus est. Primum cur ista res digna odio est, nisi quod est turpis? Pauca mutat vel plura sane; Nondum autem explanatum satis, erat, quid maxime natura vellet. Duo Reges: constructio interrete. Sic enim censent, oportunitatis esse beate vivere. Nisi autem rerum natura perspecta erit, nullo modo poterimus sensuum iudicia defendere. Satis est ad hoc responsum. '
    },
    { id: 2, string: 'How are you?!' },
    {
      id: 3,
      string:
        'Yo! Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut alios omittam, hunc appello, quem ille unum secutus est. Primum cur ista res digna odio est, nisi quod est turpis? Pauca mutat vel plura sane; Nondum autem explanatum satis, erat, quid maxime natura vellet. Duo Reges: constructio interrete. Sic enim censent, oportunitatis esse beate vivere.'
    },
    { id: 4, string: 'LOL' },
    {
      id: 5,
      string: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
    }
  ] as Array<MessageType>,
  dialogsData: [
    { id: 1, name: 'Dymych' },
    { id: 2, name: 'Alexander' },
    { id: 3, name: 'Vika' },
    { id: 4, name: 'Vasya' },
    { id: 5, name: 'Kotik' },
    { id: 6, name: 'Valeron' }
  ] as Array<DialogType>
};

export type initialStateType = typeof initialState;

type AcctionsType = InferActionsType<typeof actions>;

export const dialogsReducer = (
  state = initialState,
  action: AcctionsType
): initialStateType => {
  switch (action.type) {
    case 'SEND_MESSAGE':
      return {
        ...state,
        messagesData: [
          ...state.messagesData,
          {
            id: state.messagesData.length + 1,
            string: action.textMessage
          }
        ]
      };

    default:
      return state;
  }
};

export const actions = {
  sendMessage: (textMessage: string) => {
    return { type: 'SEND_MESSAGE', textMessage } as const;
  }
};
