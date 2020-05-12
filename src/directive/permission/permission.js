// import store from "@/store";

// export default {
//   inserted(el, binding, vnode) {
//     console.log(vnode);
//     const { value } = binding;
//     const roles = store.getters && store.getters.roles;
//     console.log("directive p: ", roles);

//     if (value && value instanceof Array && value.length > 0) {
//       const permissionRoles = value;
//       console.log("directive permissino: ", value);
//       const hasPermission = roles.some((role) => {
//         console.log("directive : ", role);
//         return permissionRoles.includes(role);
//       });
//       console.log("directive hasP : ", hasPermission);
//       if (!hasPermission) {
//         console.log("remove ");
//         el.parentNode && el.parentNode.removeChild(el);
//       }
//     } else {
//       console.log("you need permissinon like:::::::");
//       throw new Error(`need roles! Like v-permission="['admin','editor']"`);
//     }
//   },
// };
