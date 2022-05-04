import{e as _,G as b,H as f,r as x,f as l,g as r,h as e,K as o,O as d,N as a,X as g,I as h,J as w,i as y,D as v,E as i,W as k}from"./vendor.49686ed3.js";import{a as U}from"./index.e2865369.js";const V=["onSubmit"],S=e("h1",{class:"text-2xl text-slate-800 font-bold"},"Register a new account.",-1),B={class:"px-4"},C={class:"flex gap-2"},D={class:"flex justify-center"},j={class:"mb-3 w-full"},E=e("option",{value:"",selected:"",disabled:""},"Department",-1),M=["value"],N=e("input",{class:"btn btn--primary",type:"submit",value:"Register"},null,-1),A=e("span",{class:"text-sm underline"},"Already have an account?",-1),H=_({setup(L){const{signUp:p}=U(),m=b([{department_id:1,department_name:"Computing"},{department_id:2,department_name:"English"},{department_id:3,department_name:"Business"}]),s=f({email:"",password:"",username:"",department_id:1}),u=async()=>await p(s);return(R,n)=>{const c=x("router-link");return l(),r("form",{onSubmit:k(u,["prevent"]),class:"col-start-5 col-end-9 self-center flex flex-col gap-4 mb-8 p-8 rounded-lg shadow-sm bg-white"},[S,e("fieldset",B,[e("div",C,[o(e("input",{class:"appearance-none rounded-md py-2 px-2 mb-4 border-2 border-gray-100 w-full",placeholder:"username",type:"text",name:"username",id:"username","onUpdate:modelValue":n[0]||(n[0]=t=>a(s).username=t)},null,512),[[d,a(s).username]]),o(e("input",{class:"appearance-none rounded-md py-2 px-2 mb-4 border-2 border-gray-100 w-full",placeholder:"password",type:"password",name:"pass",id:"pass","onUpdate:modelValue":n[1]||(n[1]=t=>a(s).password=t)},null,512),[[d,a(s).password]])]),o(e("input",{class:"appearance-none rounded-md py-2 px-2 mb-4 border-2 border-gray-100 w-full",placeholder:"email",type:"text",name:"email",id:"email","onUpdate:modelValue":n[2]||(n[2]=t=>a(s).email=t)},null,512),[[d,a(s).email]]),e("div",D,[e("div",j,[o(e("select",{class:"form-select text-slate-800 appearance-none block w-full px-2 py-2 text-base font-normal bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:bg-white focus:text-slate-800 focus:border-blue-600 focus:outline-none","aria-label":"select department","onUpdate:modelValue":n[3]||(n[3]=t=>a(s).department_id=t)},[E,(l(!0),r(h,null,w(m.value,t=>(l(),r("option",{class:"text-slate-800",key:t.department_id,value:t.department_id},i(t.department_name),9,M))),128))],512),[[g,a(s).department_id]])])]),e("div",null,[N,y(c,{to:{name:"Login"}},{default:v(()=>[A]),_:1})])]),e("p",null,i(a(s)),1)],40,V)}}});export{H as default};
