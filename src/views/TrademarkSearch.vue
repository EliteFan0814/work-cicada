<template>
  <div class="trademark-search">
    <div class="top-search">
      <div class="left-input">
        <div class="class-wrap">
          <BaseSearchClass></BaseSearchClass>
        </div>
        <BaseInput width="90%" />
      </div>
      <div class="right-key-list">
        <BaseSearchList></BaseSearchList>
      </div>
    </div>
    <div class="content">
      <div class="left-wheel"></div>
      <div class="right-content">
        <div class="search-detail">
          <div class="detail-top">
            <BaseFilterForm></BaseFilterForm>
          </div>
          <div class="detail-btm">
            <div class="detail-btm-l">
              <BaseFilterForm></BaseFilterForm>
            </div>
            <div class="detail-btm-r">
              <BaseFilterForm></BaseFilterForm>
            </div>
          </div>
        </div>
        <div class="table"></div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.trademark-search {
  padding: 40px;
  .top-search {
    display: flex;
    align-items: flex-end;
    .left-input {
      min-width: 500px;
      width: 30%;
      .class-wrap {
        padding-left: 10px;
      }
    }
    .right-key-list {
      flex-grow: 1;
      padding-bottom: 8px;
    }
  }
  .content {
    display: flex;
    .left-wheel {
      min-width: 500px;
      width: 30%;
    }
    .right-content {
      flex-grow: 1;
      .search-detail {
        .detail-top {
          border: 1px solid #fff;
        }
        .detail-btm {
          display: flex;
          > div {
            border: 1px solid #fff;
            width: 50%;
          }
        }
      }
    }
  }
}
</style>
