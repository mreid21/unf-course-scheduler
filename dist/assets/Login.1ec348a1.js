import{e as h,u as b,G as w,H as y,r as v,f as i,g as d,N as t,T as u,h as e,K as p,O as c,E as k,i as S,D as C,W as I,I as V}from"./vendor.49686ed3.js";import{u as N,a as U}from"./index.e2865369.js";const B={key:0},D=["onSubmit"],E=e("h1",{class:"text-2xl text-slate-800 font-bold"},"Log in to your account",-1),j={class:"px-4"},L={key:0,class:"text-base text-red-500"},M=e("input",{class:"btn btn--primary",type:"submit",value:"Sign In"},null,-1),R=e("span",{class:"text-sm underline"},"Create an account.",-1),H=h({setup(T){const o=N(),m=b(),{signIn:f,getUser:A}=U(),n=w(""),s=y({email:"",password:""}),_=async()=>{const r=await f(s.email,s.password);r&&(n.value=r),o.user&&g()},g=()=>{m.push(`/${o.user.user_metadata.username}/Plans`)};return(r,a)=>{const x=v("router-link");return i(),d(V,null,[t(o).user?(i(),d("p",B,"Logged in...")):u("",!0),e("form",{onSubmit:I(_,["prevent"]),class:"col-start-5 col-end-9 self-center flex flex-col gap-4 mb-8 p-8 rounded-lg shadow-sm bg-white"},[E,e("fieldset",j,[p(e("input",{class:"appearance-none rounded-md py-2 px-2 mb-4 border-2 border-gray-100 w-full",placeholder:"email",type:"text",name:"email",id:"email","onUpdate:modelValue":a[0]||(a[0]=l=>t(s).email=l)},null,512),[[c,t(s).email]]),p(e("input",{class:"appearance-none rounded-md py-2 px-2 mb-4 border-2 border-gray-100 w-full",placeholder:"password",type:"password",name:"pass",id:"pass","onUpdate:modelValue":a[1]||(a[1]=l=>t(s).password=l)},null,512),[[c,t(s).password]]),e("div",null,[n.value?(i(),d("span",L,k(n.value),1)):u("",!0),M,S(x,{to:{name:"Register"}},{default:C(()=>[R]),_:1})])])],40,D)],64)}}});export{H as default};