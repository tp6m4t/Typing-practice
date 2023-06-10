const app = Vue.createApp({
  setup() {
    const state = Vue.reactive({
      question: null,
      userInput: '',
      progress: 0,
      maxProgress: 0,
      message: '',
      inputClasses: [],
      char_level: new Map,
      range: db.range,
      level: db.level,
      taskTime:db.taskTime
    })
    //題目表
    const questionList = [
      'ㄅ', 'ㄍ', 'ㄙ', 'ㄛ', 'ㄔ', 'ㄐ', 'ㄠ', 'ㄋ', 'ㄦ', 'ㄇ', 'ㄧ', 'ㄟ', 'ㄎ', 'ㄗ', 'ㄏ', 'ㄘ', 'ㄕ', 'ㄩ',
      'ㄣ', 'ㄖ', 'ㄜ', 'ㄒ', 'ㄊ', 'ㄑ', 'ㄈ', 'ㄌ', 'ㄆ', 'ㄨ', 'ㄉ', 'ㄞ', 'ㄓ', 'ㄚ', 'ㄝ', 'ㄡ', 'ㄢ', 'ㄤ', 'ㄥ'
    ]
    const toneList = ['ˊ', 'ˇ', 'ˋ', '˙', '_']
    const all_charList = [
      'ㄅ', 'ㄍ', 'ㄙ', 'ㄛ', 'ㄔ', 'ㄐ', 'ㄠ', 'ㄋ', 'ㄦ', 'ㄇ', 'ㄧ', 'ㄟ', 'ㄎ', 'ㄗ', 'ㄏ', 'ㄘ', 'ㄕ', 'ㄩ',
      'ㄣ', 'ㄖ', 'ㄜ', 'ㄒ', 'ㄊ', 'ㄑ', 'ㄈ', 'ㄌ', 'ㄆ', 'ㄨ', 'ㄉ', 'ㄞ', 'ㄓ', 'ㄚ', 'ㄝ', 'ㄡ', 'ㄢ', 'ㄤ', 'ㄥ',
      'ˊ', 'ˇ', 'ˋ', '˙', '_']
    //題目生成
    const generateQuestion = () => {
      updateProgress()
      let question = ''
      let length = state.range
      while (question.length < length) {
        let char = questionList[Math.floor(Math.random() * Number(state.level))]
        let tone = toneList[Math.floor(Math.random() * toneList.length)]
        if (question.length % 3 === 2 && Math.random() < 0.4) {
          question += `${char}${tone}_`
        } else {
          question += `${char}`
        }
      }

      console.log(state.level)
      console.log(question.length)
      state.question = question
      state.userInput = ''
      state.progress = 0
      state.maxProgress = question.length
      state.message = ''
      chakeval = 0
      state.inputClasses = []
      for (let char of all_charList) {
        state.char_level.set(char, { 字數: 0, 正確: 0 })
      }
      console.log(state.char_level)
      console.log(Array.from(state.char_level))


    }

    const levelInput=()=>{
      dbUpdataLevel(state.level)
      generateQuestion()
    }
    const rangeInput=()=>{
      dbUpdataRange(state.range)
      generateQuestion()
    }
    const updateProgress=()=>{
      $("meter").attr("max",30*60);
      $("meter").attr("value",state.taskTime);
  }

    // call generateQuestion function on component mount
    Vue.onMounted(() => {
      generateQuestion()
    })

    const checkAnswer = (event) => {
      if(chakeval==0){
        startTime=Math.floor(new Date().getTime()/1000);
      }
      state.userInput = ''
      const answer = state.question
      console.log(`you:${phoneticKeyboard[event.key]} true:${answer[chakeval]}`)
      if (phoneticKeyboard[event.key] == answer[chakeval]) {


        if (!chakeval) input_time = new Date().getTime()
        input_time = new Date().getTime() - input_time

        if (state.inputClasses[chakeval] == undefined) {
          state.inputClasses[chakeval] = 'correct-char'
          state.char_level.set(answer[chakeval], { 字數: Number(state.char_level.get(answer[chakeval]).字數) + 1, 正確: state.char_level.get(answer[chakeval]).正確 + 1 })
        }
        else {
          state.inputClasses[chakeval] = 'incorrect-char'
          state.char_level.set(answer[chakeval], { 字數: Number(state.char_level.get(answer[chakeval]).字數) + 1, 正確: state.char_level.get(answer[chakeval]).正確 })
        }
        console.log(state.char_level.get(answer[chakeval]))
        console.log(`用時${input_time}秒`)
        input_time = new Date().getTime()
        chakeval++
        state.message = ''
        if (chakeval === state.maxProgress) {
          state.taskTime+=Math.floor(new Date().getTime()/1000)-startTime;
          dbUpdata(Math.floor(new Date().getTime()/1000/60/60/24),state.taskTime);
          state.message = '恭喜！你已經完成練習！';
          setTimeout(generateQuestion(), 500);
        }
      }
      else {
        state.inputClasses[chakeval] = -1

      }
    }

    const unfoces = () => {
      input = 0;
      setTimeout(
        function () {
          if (input == 0) generateQuestion();
        },
        500
      );
    };

    return {
      state,
      generateQuestion,
      levelInput,
      rangeInput,
      checkAnswer,
      unfoces,
      questionList,
    }
  }
})


var chakeval = 0;
var input = 0;
var input_time




const phoneticKeyboard = {
  '1': 'ㄅ', 'q': 'ㄆ', 'a': 'ㄇ', 'z': 'ㄈ', '2': 'ㄉ', 'w': 'ㄊ', 's': 'ㄋ', 'x': 'ㄌ', 'e': 'ㄍ', 'd': 'ㄎ',
  'c': 'ㄏ', 'r': 'ㄐ', 'f': 'ㄑ', 'v': 'ㄒ', '5': 'ㄓ', 't': 'ㄔ', 'g': 'ㄕ', 'b': 'ㄖ', 'y': 'ㄗ', 'h': 'ㄘ',
  'n': 'ㄙ', '8': 'ㄚ', 'i': 'ㄛ', 'k': 'ㄜ', ',': 'ㄝ', '9': 'ㄞ', 'o': 'ㄟ', 'l': 'ㄠ', '.': 'ㄡ', '0': 'ㄢ',
  'p': 'ㄣ', ';': 'ㄤ', '/': 'ㄥ', '-': 'ㄦ', 'u': 'ㄧ', 'j': 'ㄨ', 'm': 'ㄩ', '6': 'ˊ' , '3': 'ˇ' , '4': 'ˋ' ,
  '7': '˙',' ': '_'
};
