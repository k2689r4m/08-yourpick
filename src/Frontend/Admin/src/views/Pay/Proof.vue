<template>
  <div class="content">
    <div>
      <div class="section">
        <div class="section-tit">결제 증빙</div>
        <div class="tab-con">
          <div class="search-top">
            <div class="left">
              <div class="input-label">
                <select class="form-select">
                  <option>이름</option>
                </select>
              </div>
              <input type="text" class="form-control md" />
            </div>
            <div class="right">
              <button type="button" class="btn btn-sm btn-primary">검색</button>
            </div>
          </div>
          <div class="table-top">
            <div class="left"></div>
            <div class="right">
              <button
                type="button"
                class="btn btn-sm btn-secondary"
                @click="popup1 = true"
              >
                세금계산서요청
              </button>
              <button
                type="button"
                class="btn btn-sm btn-secondary"
                @click="popup2 = true"
              >
                현금영수증요청
              </button>
            </div>
          </div>
          <div class="table-wrap">
            <table class="table">
              <tr>
                <th>번호</th>
                <th>등록일</th>
                <th>이름</th>
                <th>사업자번호</th>
                <th>상호(법인)명</th>
                <th>대표자</th>
                <th>담당자</th>
                <th>이메일</th>
                <th>연락처</th>
                <th>퓸목/업태</th>
                <th>주소</th>
                <th>처리상태</th>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </div>
    <div class="popup-wrap" v-if="popup1">
      <div class="dim"></div>
      <div class="popup md">
        <div class="popup-tit">
          세금 계산서 요청
          <button
            type="button"
            class="btn btn-close"
            @click="popup1 = false"
          ></button>
        </div>
        <div class="popup-con">
          <div class="table-text">
            <table class="table">
              <colgroup>
                <col width="15%" />
                <col width="35%" />
                <col width="15%" />
                <col width="35%" />
              </colgroup>
              <tr>
                <th>요청한 아이디</th>
                <td>
                  <input type="text" class="form-control" />
                </td>
                <th>관리 계정 아이디</th>
                <td>
                  <input type="text" class="form-control" />
                </td>
              </tr>
              <tr>
                <th>사업자번호</th>
                <td>
                  <div class="input-wrap">
                    <input type="text" class="form-control" />
                    <span class="between">-</span>
                    <input type="text" class="form-control" />
                    <span class="between">-</span>
                    <input type="text" class="form-control" />
                  </div>
                </td>
                <th>상호(법인)명</th>
                <td>
                  <input type="text" class="form-control" />
                </td>
              </tr>
              <tr>
                <th>대표자</th>
                <td>
                  <input type="text" class="form-control" />
                </td>
                <th>담당자</th>
                <td>
                  <input type="text" class="form-control" />
                </td>
              </tr>
              <tr>
                <th>이메일</th>
                <td>
                  <div class="input-wrap">
                    <input type="text" class="form-control" />
                    <span class="between">@</span>
                    <input type="text" class="form-control" />
                  </div>
                </td>
                <th>연락처</th>
                <td>
                  <div class="input-wrap">
                    <select class="form-select">
                      <option>선택</option>
                    </select>
                    <span class="between">-</span>
                    <input type="text" class="form-control" />
                    <span class="between">-</span>
                    <input type="text" class="form-control" />
                  </div>
                </td>
              </tr>
              <tr>
                <th>종목</th>
                <td>
                  <input type="text" class="form-control" />
                </td>
                <th rowspan="2">주소</th>
                <td rowspan="2">
                  <div class="input-wrap">
                    <input type="text" class="form-control" readonly />
                    <button type="button" class="btn btn-xsm btn-light">
                      주소찾기
                    </button>
                  </div>
                  <div class="input-wrap mt-1">
                    <input type="text" class="form-control" />
                  </div>
                </td>
              </tr>
              <tr>
                <th>업태</th>
                <td>
                  <input type="text" class="form-control" />
                </td>
              </tr>
            </table>
          </div>
          <div class="btn-wrap">
            <button
              type="button"
              class="btn btn-sm btn-secondary"
              @click="popup1 = false"
            >
              취소
            </button>
            <button
              type="button"
              class="btn btn-sm btn-primary"
              @click="popup1 = false"
            >
              발급완료
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="popup-wrap" v-if="popup2">
      <div class="dim"></div>
      <div class="popup sm">
        <div class="popup-tit">
          현금 영수증 요청
          <button
            type="button"
            class="btn btn-close"
            @click="popup2 = false"
          ></button>
        </div>
        <div class="popup-con">
          <div class="table-text">
            <table class="table">
              <colgroup>
                <col width="30%" />
                <col width="70%" />
              </colgroup>
              <tr>
                <th>요청한 아이디</th>
                <td>
                  <input type="text" class="form-control" />
                </td>
              </tr>
              <tr>
                <th>관리 계정 아이디</th>
                <td>
                  <input type="text" class="form-control" />
                </td>
              </tr>
              <tr>
                <th>영수증 용도</th>
                <td>
                  <label class="input-checkbox">
                    <input type="radio" name="radio" />
                    <span class="checkbox radio"></span>
                    <span class="text">소득공제용(근로자 연말정산용)</span>
                  </label>
                  <label class="input-checkbox">
                    <input type="radio" name="radio" />
                    <span class="checkbox radio"></span>
                    <span class="text">지출증빙용(사업자 경비인정용)</span>
                  </label>
                </td>
              </tr>
              <tr>
                <th>발급정보</th>
                <td>
                  <div class="input-wrap">
                    <label class="input-checkbox">
                      <input type="radio" name="radio2" />
                      <span class="checkbox radio"></span>
                      <span class="text">현금영수증 카드번호</span>
                    </label>
                    <label class="input-checkbox">
                      <input type="radio" name="radio2" />
                      <span class="checkbox radio"></span>
                      <span class="text">휴대폰번호</span>
                    </label>
                  </div>
                  <div class="input-wrap mt-1">
                    <input type="text" class="form-control" />
                  </div>
                </td>
              </tr>
              <tr>
                <th>발급정보</th>
                <td>
                  <div class="input-wrap">
                    <span class="m-r--2">사업자등록번호</span>
                    <input type="text" class="form-control" />
                  </div>
                </td>
              </tr>
            </table>
          </div>
          <div class="btn-wrap">
            <button
              type="button"
              class="btn btn-sm btn-secondary"
              @click="popup1 = false"
            >
              취소
            </button>
            <button
              type="button"
              class="btn btn-sm btn-primary"
              @click="popup1 = false"
            >
              발급완료
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Approval",
  components: {},
  data() {
    return {
      popup1: false,
      popup2: false,
    };
  },
  created() {},
  computed: {},
  methods: {},
};
</script>

<style></style>
