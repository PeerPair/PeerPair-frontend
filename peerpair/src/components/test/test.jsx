
// const ChatListWithChatMsg = () => {
//     return ( 
//         <>
//         <div class="col w-5 h-100 chat-col"> {/* main page or body */}
//             <div class="cs-main-container cs-main-container--responsive chat-shadow">
//                 <div class="cs-sidebar cs-sidebar--left"> {/* chat list */} {/* **********************start*********************** */}
//                     <div class="cs-conversation-header" style={{backgroundColor: (255, 255, 255)}}> {/* chat list header */}
//                         <div class="cs-conversation-header__avatar"> {/* chat list header img*/}
//                             <div tabindex="0" class="cs-avatar cs-avatar--md local-user">
//                                 <img src="" alt=""/>
//                             </div>
//                         </div>
//                         <div class="cs-conversation-header__content"> {/* chat list header name*/}
//                             <div class="cs-conversation-header__user-name"></div>
//                             <div class="cs-conversation-header__user-name">
//                                 <div class="cs-conversation-header__info">
//                                     <span>Status</span>
//                                 </div>
//                             </div>
//                         </div>
//                         <div style={{height:"0", width:"0"}}> {/* chat list header empty div*/} </div>
//                         <div class="status-list" data-popper-reference-hidden="true" data-popper-escaped="false" data-popper-placement="bottom-start" > {/* chat list for status*/} {/*style={{position: absolute,inset: (0, auto ,auto, 0),transform: (163, 150)}}*/}
//                             <ul class="cs-status-list cs-status-list--md">
//                                 <li tabindex="-1">
//                                     <div ariaSelected="" class="cs-status cs-status--md cs-status--available cs-status--selected cs-status--named">
//                                         <div class="cs-status__bullet"></div>
//                                         <div class="cs-status__name">Available</div>
//                                     </div>
//                                 </li>
//                                 <li tabindex="-1">
//                                     <div ariaSelected="" class="cs-status cs-status--md cs-status--available cs-status--selected cs-status--named">
//                                         <div class="cs-status__bullet"></div>
//                                         <div class="cs-status__name">Available</div>
//                                     </div>
//                                 </li>
//                                 <li tabindex="-1">
//                                     <div ariaSelected="" class="cs-status cs-status--md cs-status--available cs-status--selected cs-status--named">
//                                         <div class="cs-status__bullet"></div>
//                                         <div class="cs-status__name">Available</div>
//                                     </div>
//                                 </li>
//                             </ul>
//                         </div>
//                         <div class="cs-search"> {/* chat list search bar*/}
//                             <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="search" class="svg-inline--fa fa-search fa-w-16 cs-search__search-icon" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
//                                 <path fill="currentColor" d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path>
//                             </svg>
//                             <input type="text" class="cs-search__input" placeholder="" value=""></input>
//                             <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="times" class="svg-inline--fa fa-times fa-w-11 cs-search__clear-icon" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512">
//                                 <path fill="currentColor" d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"></path>
//                             </svg>
//                         </div>
//                         <div class="cs-conversation-list"> {/* chat list conversation*/}
//                             <div class="scrollbar-container ps">
//                                 <div class="ps__rail-x" style={{left: 0, bottom: 0}}>
//                                     <div class="ps__thumb-x" tabindex="0" style={{left: 0, width: 0}}></div>
//                                 </div>
//                                 <div class="ps__rail-y" style={{top: 0, right: 0, height: 251}}>
//                                     <div class="ps__thumb-y" tabindex="0" style={{top: 0, height: 0}}></div>
//                                 </div>
//                                 <ul>
//                                     <li>
//                                         <div class="cs-conversation cs-conversation--active">
//                                             <div class="cs-avatar cs-avatar--md" style={{width: 43}}>
//                                                 <img img src="/static/joe-641da105b2f2f31a2174bffaa5dcac11.svg" alt="Joe"/>
//                                                 <div class="cs-status cs-status--md cs-status--eager">
//                                                     <div class="cs-status__bullet"></div>
//                                                 </div>
//                                             </div>
//                                             <div class="cs-conversation__content">
//                                                 <div class="cs-conversation__name">Joe</div>
//                                                 <div class="cs-conversation__info">
//                                                     <div class="cs-conversation__info-content">
//                                                         <span>Boring</span>
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </li>
//                                     <li>
//                                         <div class="cs-conversation">
//                                             <div class="cs-avatar cs-avatar--md" style={{width: 43}}>
//                                                 <img img src="/static/joe-641da105b2f2f31a2174bffaa5dcac11.svg" alt="Joe"/>
//                                                 <div class="cs-status cs-status--md cs-status--available">
//                                                     <div class="cs-status__bullet"></div>
//                                                 </div>
//                                             </div>
//                                             <div class="cs-conversation__content">
//                                                 <div class="cs-conversation__name">Joe</div>
//                                                 <div class="cs-conversation__info">
//                                                     <div class="cs-conversation__info-content">
//                                                         <span>Happy</span>
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </li>
//                                 </ul>
//                             </div>
//                         </div>
//                     </div>
//                 </div> {/* chat list */} {/* **********************end*********************** */}

//                 <div class="cs-chat-container"> {/* chat msg */} {/* **********************start*********************** */}
//                     <div class="cs-conversation-header">{/* header */}
//                         <div class="cs-conversation-header__back">
//                             <button class="cs-button cs-button--arrow">
//                                 <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="arrow-left" class="svg-inline--fa fa-arrow-left fa-w-14 " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
//                                     <path fill="currentColor" d="M257.5 445.1l-22.2 22.2c-9.4 9.4-24.6 9.4-33.9 0L7 273c-9.4-9.4-9.4-24.6 0-33.9L201.4 44.7c9.4-9.4 24.6-9.4 33.9 0l22.2 22.2c9.5 9.5 9.3 25-.4 34.3L136.6 216H424c13.3 0 24 10.7 24 24v32c0 13.3-10.7 24-24 24H136.6l120.5 114.8c9.8 9.3 10 24.8.4 34.3z"></path>
//                                 </svg>
//                             </button>
//                         </div>
//                         <div class="cs-conversation-header__avatar"> {/* img */}
//                             <div class="cs-avatar cs-avatar--md">
//                                 <img src="/static/joe-641da105b2f2f31a2174bffaa5dcac11.svg" alt=""/>
//                                 <div class="cs-status cs-status--md cs-status--eager">
//                                     <div class="cs-status__bullet"></div>
//                                 </div>
//                             </div>
//                         </div>
//                         <div class="cs-conversation-header__content"> {/* name */}
//                             <div class="cs-conversation-header__user-name">Joe</div>
//                             <div class="cs-conversation-header__info">
//                                 <span>Boring</span>
//                             </div>
//                         </div>
//                         <section class="cs-conversation-header__actions"></section>
//                     </div>
//                     <div class="cs-message-list">{/* msg list */}
//                         <div data-cs-message-list="" class="scrollbar-container cs-message-list__scroll-wrapper ps"> {/*style={{overscrollBehaviorY: none, overflowAnchor: auto, touchAction: none}}*/}
//                             <div class="cs-message-list__scroll-to"></div>
//                             <div class="ps__rail-x" style={{left: 0, bottom: 0}}>
//                                 <div class="ps__thumb-x" tabindex="0" style={{left: 0, width: 0}}></div>
//                             </div>
//                             <div class="ps__rail-y" style={{top: 0, right: 0}}>
//                                 <div class="ps__thumb-y" tabindex="0" style={{top: 0, height: 0}}></div>
//                             </div>
//                         </div> 
//                         <div class="cs-message-list__typing-indicator-container"></div>
//                     </div>
//                     <div class="cs-message-input">{/* msg input */}
//                         <div class="cs-message-input__content-editor-wrapper">
//                             <div class="scrollbar-container cs-message-input__content-editor-container ps">
//                                 <div class="cs-message-input__content-editor" contenteditable="true" data-placeholder="Type here...">
//                                     ::before
//                                 </div>
//                                 <div class="ps__rail-x" style={{left: 0, bottom: 0}}>
//                                     <div class="ps__thumb-x" tabindex="0" style={{left: 0, width: 0}}></div>
//                                 </div>
//                                 <div class="ps__rail-y" style={{top: 0, right: 0}}>
//                                     <div class="ps__thumb-y" tabindex="0" style={{top: 0, height: 0}}></div>
//                                 </div>
//                             </div>
//                         </div>
//                         <div class="cs-message-input__tools">
//                             <button class="cs-button cs-button--send">
//                                 <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="paper-plane" class="svg-inline--fa fa-paper-plane fa-w-16 " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
//                                     <path fill="currentColor" d="M476 3.2L12.5 270.6c-18.1 10.4-15.8 35.6 2.2 43.2L121 358.4l287.3-253.2c5.5-4.9 13.3 2.6 8.6 8.3L176 407v80.5c0 23.6 28.5 32.9 42.5 15.8L282 426l124.6 52.2c14.2 6 30.4-2.9 33-18.2l72-432C515 7.8 493.3-6.8 476 3.2z"></path>
//                                 </svg>
//                             </button>
//                         </div>
//                     </div>
//                 </div>  {/* chat msg */} {/* **********************end*********************** */}
//             </div>
//         </div>
//         </>
//     )
// }

// export default ChatListWithChatMsg ;